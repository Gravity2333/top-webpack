import { base } from "./base.js";

function b() {
  console.log("b module"+'b 调用了');
  base();
}

export { b };
