import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generator from "@babel/generator";
import fs from "fs";
import path from "path";
import {
  variableDeclaration,
  variableDeclarator,
  identifier,
  callExpression,
  stringLiteral,
  objectProperty,
  objectPattern,
  memberExpression,
  assignmentExpression,
  expressionStatement,
  isVariableDeclaration,
  objectExpression,
} from "@babel/types";
import ejs from "ejs";

type Asset = {
  deps: string[];
  fileContent: string;
  filePath: string;
};

type Modules = Record<number, [Asset, Record<string, number>]>;

(() => {
  function unRepeatList<T>(matchAttribute: any = "") {
    const deps: T[] = [];
    const depsSet = new Set<T>();

    return [
      deps,
      function push(item: T) {
        if (matchAttribute) {
          //@ts-ignore
          if (!depsSet.has(item[matchAttribute])) {
            deps.push(item);
            //@ts-ignore
            depsSet.add((item as any)[matchAttribute]);
          }
        } else {
          if (!depsSet.has(item)) {
            deps.push(item);
            depsSet.add(item);
          }
        }
      },
    ] as const;
  }

  /**
   * 创建一个资源
   * @param path
   */
  function createAsset(completeAssetPath: string): Asset {
    /** 文件原始内容 */
    const fileContent = fs.readFileSync(completeAssetPath).toString();
    /** 生成抽象语法树 */
    const ast = parse(fileContent, { sourceType: "module" });
    /** 存储依赖 */
    const [deps, pushDeps] = unRepeatList<string>();
    /** 导出MAP */
    const exportsMap: any = {};
    /** 是否模块导出 */
    let moduleExport = false
    /** 预先扫描 */
    traverse(ast, {
      ExportDefaultDeclaration() { moduleExport = true; },
      ExportNamedDeclaration() { moduleExport = true; }
    });
    /** 遍历AST */
    traverse(ast, {
      // 提取require信息
      CallExpression(path) {
        if (
          path.node.callee.type === "Identifier" &&
          path.node.callee.name === "require" &&
          path.node.arguments[0]?.type === "StringLiteral"
        ) {
          pushDeps(path.node.arguments[0].value);
          // 替换为 __webpack_require__
          path.replaceWith(
            callExpression(identifier("__webpack_require__"), [
              stringLiteral(path.node.arguments[0].value),
            ])
          );
        }
      },
      // import的信息
      ImportDeclaration(path) {
        pushDeps(path.node.source.value);

        // 获取导入的模块路径（如 './a.js'）
        const source = path.node.source.value;

        // 根据导入类型生成不同的 __webpack_require__ 调用
        let requireCall;
        if (
          path.node.specifiers.length === 1 &&
          path.node.specifiers[0].type === "ImportDefaultSpecifier"
        ) {
          // 默认导入：import foo from 'bar'
          const localName = path.node.specifiers[0].local.name;
          const random = Math.random().toString(36).substring(2, 8)
          const __WEBPACK_IMPORTED_MODULE__ = '__WEBPACK_IMPORTED_MODULE__' + random
          const __WEBPACK_IMPORTED_MODULE_DEFAULT_ = '__WEBPACK_IMPORTED_MODULE_DEFAULT__'+random
          requireCall = variableDeclaration("var", [
            variableDeclarator(
              identifier(__WEBPACK_IMPORTED_MODULE__),
              callExpression(identifier("__webpack_require__"), [
                stringLiteral(source),
              ])
            ),
          ]);

          const defaultFnCall = variableDeclaration("var", [
            variableDeclarator(
              identifier(__WEBPACK_IMPORTED_MODULE_DEFAULT_),
              callExpression(
                memberExpression(
                  identifier("__webpack_require__"),
                  identifier("n")
                ),
                [identifier(__WEBPACK_IMPORTED_MODULE__)]
              )
            ),
          ]);

          const defaultCall = variableDeclaration("var", [
            variableDeclarator(
              identifier(localName),
              callExpression(
                identifier(__WEBPACK_IMPORTED_MODULE_DEFAULT_),
                []
              )
            ),
          ])

          // 替换 import 语句
          path.replaceWithMultiple([
            requireCall,
            defaultFnCall,
            defaultCall
          ]);
        } else {
          // 命名导入：import { foo } from 'bar'
          const properties = path.node.specifiers.map((spec) => {
            return objectProperty(
              identifier(spec.local.name),
              identifier(spec.local.name),
              false,
              spec.local.name === spec.local.name
            );
          });

          requireCall = variableDeclaration("var", [
            variableDeclarator(
              objectPattern(properties),
              callExpression(identifier("__webpack_require__"), [
                stringLiteral(source),
              ])
            ),
          ]);


          // 替换 import 语句
          path.replaceWith(requireCall);
        }

      },

      // 处理默认导出
      ExportDefaultDeclaration(path) {
        const declaration = path.node.declaration;

        // 存储默认导出
        exportsMap.default = () => declaration;
        // 移除原导出语句
        path.remove();
      },

      // 处理命名导出
      ExportNamedDeclaration(path) {
        // 处理声明式导出 (export const/let/var)
        if (path.node.declaration) {
          const declaration = path.node.declaration;

          if (isVariableDeclaration(declaration)) {
            declaration.declarations.forEach((declarator) => {
              const name = (declarator.id as any).name;
              // 存储命名导出
              exportsMap[name] = () => declarator.id;
            });
            // 保留变量声明但移除 export 关键字
            path.replaceWith(declaration);
          }
        }
        // 处理导出列表 (export { a, b as c })
        else if (path.node.specifiers.length > 0) {
          path.node.specifiers.forEach((specifier: any) => {
            const exportedName = specifier.exported.name;
            const localName = specifier.local.name;
            // 存储命名导出
            exportsMap[exportedName] = () => identifier(localName);
          });
          // 移除导出语句
          path.remove();
        }
      },

      // 在所有导出处理完成后，添加 __webpack_require__.d 调用
      Program: {
        enter(path) {
          if (moduleExport) {
            // 在最前面添加 __webpack_require__.r(exports)
            path.unshiftContainer('body',
              expressionStatement(
                callExpression(
                  memberExpression(
                    identifier("__webpack_require__"),
                    identifier("r")
                  ),
                  [identifier("exports")]
                )
              )
            );
          }
        },

        exit(path) {
          if (Object.keys(exportsMap).length > 0) {
            const properties = Object.entries(exportsMap).map(([key, value]) =>
              objectProperty(identifier(key), (value as any)())
            );

            const exportObject = objectExpression(properties);

            const webpackRequireCall = expressionStatement(
              callExpression(
                memberExpression(
                  identifier("__webpack_require__"),
                  identifier("d")
                ),
                [identifier("exports"), exportObject]
              )
            );

            // 正确使用 path.pushContainer
            path.node.body.push(webpackRequireCall);
          }
        },
      },
    });
    //   console.log(JSON.stringify(ast, null, 2), deps);
    return {
      deps,
      fileContent: generator(ast).code,
      filePath: completeAssetPath,
    };
  }

  /*
   * 广度优先收集依
   * @param entry
   */
  function collectAssetsBFS(entry: string): Modules {
    /** 存储asset */
    const assets: Asset[] = [];
    let cnt = 0,
      index = 0;
    const filePathtoModuleIdMap: any = new Map();
    const modules: Modules = {};
    assets.push(createAsset(entry));
    filePathtoModuleIdMap.set(entry, cnt);

    while (assets.length > 0) {
      const asset = assets.shift()!;
      const depsMap: any = {};
      const filePath = asset.filePath;
      const moduleId = filePathtoModuleIdMap.get(filePath);
      modules[moduleId] = [asset, depsMap];
      asset.deps.forEach((dep) => {
        const depPath = path.resolve(filePath, "../", dep);
        if (!filePathtoModuleIdMap.has(depPath)) {
          const depAsset = createAsset(depPath);
          const currentcnt = ++cnt;
          assets.push(depAsset);
          filePathtoModuleIdMap.set(depPath, currentcnt);
        }

        depsMap[dep] = filePathtoModuleIdMap.get(depPath);
      });
      index++;
    }
    return modules;
  }

  // 解析配置
  const configFilePath = path.resolve(__dirname, "../toy-webpack.config.js");
  const config = require(configFilePath);
  const entry = path.resolve(configFilePath, "../", config.entry);
  // 依赖收集
  const modules = collectAssetsBFS(entry);
  // 生成打包文件
  const runTimeTemplate = fs
    .readFileSync(path.resolve(__filename, "../", "./runtime.ejs"))
    .toString();
  const dist = ejs.render(runTimeTemplate, { modules: modules }, {});

  // 输出文件
  const configOutputPath = config.output?.path;
  const configOutputFilename = config.output?.filename;
  const outputPath = path.resolve(configOutputPath, "./");
  fs.mkdir(outputPath, { recursive: true }, (err) => { });
  fs.writeFileSync(path.resolve(outputPath, configOutputFilename), dist);
})();
