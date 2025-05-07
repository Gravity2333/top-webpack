import aDefault,{ a } from "./a.js";
import testA from './a.js'
import { b } from "./b.js";
require("./a.js");
const { base } = require("./base.js");
a();
b();
base();
console.log(aDefault,testA)
const c = 10
export default 200
export const t = 10
export {c}

