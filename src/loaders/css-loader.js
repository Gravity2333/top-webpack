function cssLoader(source) {
  const options = this.getOptions();
  if (options.modules !== true) {
    return `export default \`${source}\``;
  } else {
    // 处理 module
    const classNameMatcher = /\.([A-Za-z0-9_\-]+)/g;
    // css Key Map
    const cssKeyMap = {};
    const newSource = source.replace(classNameMatcher, (capture) => {
      const random = Math.random().toString(36).substring(2, 8);
      const newClassName = `${capture}_${random}`;
      cssKeyMap[capture.slice(1)] = newClassName.slice(1);
      return newClassName;
    });
    return `\`/**__CSS_SOURCE__${newSource}*/ /**__CSS_KEYMAP__${JSON.stringify(
      cssKeyMap
    )}*/\``;
  }
}

module.exports = cssLoader;
