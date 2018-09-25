本质上，webpack是一个现代javascript应用程序的静态模块打包器(module bundler)，根据依赖关系dependency graph讲模块打包成一个或者多个bundle.
webpack4.0，无具体配置 
### entry
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
### output 
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：
```
const path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
最上面导入的 path 模块是什么，它是一个 Node.js 核心模块，用于操作文件路径。
