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
  
    // 定义 exports 的 getter（用于支持 ES Module 的导出语义）
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
  
    // 启动入口模块（moduleId = 0）
    return __webpack_require__(0);
  })({
    
      0: [
        function(module, exports, __webpack_require__) {
          const {
  aDefault,
  a
} = __webpack_require__("./a.js");
const testA = __webpack_require__("./a.js");
const {
  b
} = __webpack_require__("./b.js");
__webpack_require__("./a.js");
const {
  base
} = __webpack_require__("./base.js");
a();
b();
base();
console.log(aDefault, testA);
const c = 10;
const t = 10;
__webpack_require__.d(exports, {
  default: 200,
  t: t,
  c: c
});
        },
        {"./a.js":1,"./b.js":2,"./base.js":3}
      ],
    
      1: [
        function(module, exports, __webpack_require__) {
          const {
  base
} = __webpack_require__("./base.js");
function a() {
  console.log("a module");
  base();
}
__webpack_require__.d(exports, {
  a: a,
  default: 100
});
        },
        {"./base.js":3}
      ],
    
      2: [
        function(module, exports, __webpack_require__) {
          const {
  base
} = __webpack_require__("./base.js");
function b() {
  console.log("b module" + 'b 调用了');
  base();
}
__webpack_require__.d(exports, {
  b: b
});
        },
        {"./base.js":3}
      ],
    
      3: [
        function(module, exports, __webpack_require__) {
          function base() {
  console.log("base module");
}
__webpack_require__.d(exports, {
  base: base
});
        },
        {}
      ],
    
  });
  