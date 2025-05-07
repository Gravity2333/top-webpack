((__webpack_modules__) => {
    const __webpack_module_cache__ = {};
  
    function __webpack_require__(moduleId) {
      // 检查缓存
      if (__webpack_module_cache__[moduleId]) {
        return __webpack_module_cache__[moduleId].exports;
      }
  
      // 创建新模块
      const module = (__webpack_module_cache__[moduleId] = {
        exports: {}
      });
  
      // 定义模块内的 require 函数
      function require(path) {
        const depsId = __webpack_modules__[moduleId][1][path];
        return __webpack_require__(depsId);
      }

      require.__proto__ = __webpack_require__
  
      // 执行模块函数
      __webpack_modules__[moduleId][0].call(
        module.exports,
        module,
        module.exports,
        require
      );
  
      // 返回模块的 exports
      return module.exports;
    }
  
    // 定义 exports 的 getter（用于支持 ES Module 的导出语义）(Harmony Export)
    __webpack_require__.d = (exports, definition) => {
      for (const key in definition) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: () => definition[key]
        });
      }
    };
  
    // 标记为 ES 模块
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };

    // 根据ES标记 处理默认导入
    __webpack_require__.n = (exports) => {
      if(exports['__esModule'] === true){
        return () => exports['default']
      }else{
        return () => exports
      }
    }
  
    // 启动入口模块（moduleId = 0）
    return __webpack_require__(0);
  })({
    
      0: [
        function(module, exports, __webpack_require__) {
          var __WEBPACK_IMPORTED_MODULE__aogskn = __webpack_require__("./cnt.js");
var __WEBPACK_IMPORTED_MODULE_DEFAULT__aogskn = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE__aogskn);
var e = __WEBPACK_IMPORTED_MODULE_DEFAULT__aogskn();
var __WEBPACK_IMPORTED_MODULE__q7xxto = __webpack_require__("./base.js");
var __WEBPACK_IMPORTED_MODULE_DEFAULT__q7xxto = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE__q7xxto);
var base = __WEBPACK_IMPORTED_MODULE_DEFAULT__q7xxto();
e.cnt += 10;
console.log(base, e.cnt);
// import testA from './a.js'
// import { b } from "./b.js";
// require("./a.js");
// const { base } = require("./base.js");
// a();
// b();
// base();
// console.log(aDefault,testA)
// const c = 10
// export default 200
// export const t = 10
// export {c}
        },
        {"./cnt.js":1,"./base.js":2}
      ],
    
      1: [
        function(module, exports, __webpack_require__) {
          __webpack_require__.r(exports);
let cnt = 10;
__webpack_require__.d(exports, {
  cnt: cnt
});
        },
        {}
      ],
    
      2: [
        function(module, exports, __webpack_require__) {
          function base() {
  console.log("base module");
}
module.exports.default = base;
// module.exports['__esModule'] = true
        },
        {}
      ],
    
  });
  