fix!!!:
1. CommonJS
NodeJS是CommonJS规范的实现，webpack 也是以CommonJS的形式来书写

2. AMD( define, require([module], callback) )
浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。
(require.js和curl.js。)

3.CMD( sea.js)

4.ES6 Module
(import, export)




1.Webpack遵循标准 CMD
特征 import export  

2.requireJS 遵循标准 AMD
特征 defined  require

https://www.cnblogs.com/chenguangliang/p/5856701.html


3.ES6 module
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

