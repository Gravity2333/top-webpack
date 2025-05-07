const { base } = require("./base.js");
function a() {
  console.log("a module");
  base();
}

export { a };
export default 100
