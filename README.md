# top-webpack

`top-webpack` 是一个用 TypeScript 编写的简易打包器，旨在帮助学习和理解 Webpack 的核心打包原理，包括模块依赖分析、构建模块图、代码执行模板封装等过程。

---

## ✨ 特性 Features

- 使用 AST 分析模块依赖（通过 `@babel/parser` 等工具）
- 构建模块依赖图
- 支持 CommonJS `require` 调用
- 输出一个模拟 Webpack 运行时代码结构
- 使用 EJS 模板生成最终打包文件
- 实现简化版 `__webpack_require__` 函数执行模块

---

## 📦 安装依赖

```bash
安装依赖
npm install
开发模式
npm run start
构建打包
npm run build
```

本项目用于深入学习打包器的核心流程，理解以下关键点：

如何从入口文件出发，递归收集依赖

如何通过 AST 识别模块依赖路径

如何将模块打平为统一执行结构

模拟 Webpack 的运行时如何加载模块、缓存模块等

📖 License
MIT

---

这个 `README.md` 足够清晰简洁，适合教学、展示和托管在 GitHub 上。是否还希望我为你生成对应的 `tsconfig.json` 或 `.gitignore` 文件？
