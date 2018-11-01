摘自: [初探 React Router 4.0](https://www.jianshu.com/p/e3adc9b5f75c)

### react router 4.0
## react-router 还是 react-router-dom？
只需引用 react-router-dom 这个包就行了。当然，如果搭配 redux ，你还需要使用 react-router-redux。

## 组件
## <BrowserRouter>
一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。此组件拥有以下属性：
basename: string 
作用：为所有位置添加一个基准URL
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。
```
  <BrowserRouter basename="/minooo" />
  <Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```
getUserConfirmation: func
作用：导航到此页面前执行的函数，默认使用 window.confirm
使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
``` javascript
  const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
  }

<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
```
