## 高阶组件
[React高阶组件(HOC)模型理论与实践](https://segmentfault.com/a/1190000008112017?_ea=1553893)

### 什么是HOC 高阶组件

HOC(全称Higher-order component)是一种React的进阶使用方法，主要还是为了便于组件的复用。HOC就是一个方法，获取一个组件，返回一个更高级的组件。

### 使用场景

在React开发过程中，发现有很多情况下，组件需要被"增强"，比如说给组件添加或者修改一些特定的props，一些权限的管理，或者一些其他的优化之类的。而如果这个功能是针对多个组件的，同时每一个组件都写一套相同的代码，明显显得不是很明智，所以就可以考虑使用HOC。

### 简单实现

HOC不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。


```javascript
function HOCFactory(WrappedComponent){
  return HOC extends React.component{
    render(
      <WrapperComponent {...this.props} />
    )
  }
}

```
