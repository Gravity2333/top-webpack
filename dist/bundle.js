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
          //@ts-ignore
var __WEBPACK_IMPORTED_MODULE__qnxisd = __webpack_require__("./styles.css");
var __WEBPACK_IMPORTED_MODULE_DEFAULT__qnxisd = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE__qnxisd);
var styles = __WEBPACK_IMPORTED_MODULE_DEFAULT__qnxisd();
console.log(styles);
// // 直接使用 styles 对象
const div = document.createElement("div");
div.innerHTML = "Hello CSS Modules!";
div.className = styles.container; // 直接使用类名映射
document.body.appendChild(div);
        },
        {"./styles.css":1}
      ],
    
      1: [
        function(module, exports, __webpack_require__) {
          __webpack_require__.r(exports);
(function appendDom(cssSource) {
  const styleDom = document.createElement("style");
  styleDom.innerText = cssSource;
  document.head.appendChild(styleDom);
})(`.container_taq38x {
  color: white;
  background-color: red;
}

.body_zauech {
  height: 200px;
}

._test_ix2p2y{
    vertical-align: middle;
}

span {
  font-family: "Courier New", Courier, monospace;
}
*/ /**__CSS_KEYMAP__{"container":"container_taq38x","body":"body_zauech","_test":"_test_ix2p2y"}`);
__webpack_require__.d(exports, {
  default: {
    "container": "container_taq38x",
    "body": "body_zauech",
    "_test": "_test_ix2p2y"
  }
});
        },
        {}
      ],
    
  });
  