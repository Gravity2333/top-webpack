function appendDom(cssSource) {
  const styleDom = document.createElement("style");
  styleDom.innerText = cssSource;
  document.head.appendChild(styleDom);
}

module.exports = function styleLoader(source) {
  console.log(source);
  return source;
};

module.exports.pitch = function (remainingRequest, previousRequest, data) {
  return `
    import source from "!!${remainingRequest}"
    const sourceMatcher = /\/\*\*__CSS_SOURCE__([\s\S]*)\*\//;
    const keyMapMatcher = /\/\*\*__CSS_KEYMAP__([\s\S]*)\*\//;
    const cssSource = sourceMatcher.exec(source)?.[1];
    const cssKeyMap = keyMapMatcher.exec(source)?.[1];
    (${appendDom})(cssSource)
    export default cssKeyMap
  `;
};
