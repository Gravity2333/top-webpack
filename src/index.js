//@ts-ignore
import styles from './styles.css';
console.log(styles)
// // 直接使用 styles 对象
const div = document.createElement("div");
div.innerHTML = "Hello CSS Modules!";
div.className = styles.container; // 直接使用类名映射
document.body.appendChild(div);