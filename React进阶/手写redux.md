参考：
[跟着例子一步步学习redux+react-redux](https://www.javascriptcn.com/read-6355.html)

### React.js的context  
context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，每个组件都能够改 context 里面的内容会导致程序的运行不可预料。

```javascript
//App.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Main from './main';
import './App.css';

class App extends Component {
  //提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证
  static childContextType = {
    themeColor: PropTypes.string
  }
  constructor(){
    super()
    this.state = {
      themeColor: 'red'
    }
  }
  //getChildContext 是设置context的过程，返回的对象就是context,
  //所有自组建都可以访问到这个对象
  getChildContext(){
    return {
      themeColor: this.state.theColor
    }
  }
}
```
```javascript
//title.js
class Title extends Component {
  //任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，
  //然后可以通过 this.context 访问到那些状态
  static childContextType = {
    themeColor: PropTypes.string
  }
  render(){
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    )
  }
}

```
```javascript
//content.js
import React, { Component } from 'react';
class Content extends Component {
    render () {
        return (
        <div>
            <h2>this is 内容</h2>
        </div>
        )
    }
}
export default Content;

```
