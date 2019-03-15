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
    render(){
      return <WrapperComponent {...this.props} />
    }
  }
}

```

### HOC可以做什么
1. 代码复用（替代mixin）
2. 增删改props
3. 渲染劫持 
劫持，由于传入的wrappedComponent是作为一个child进行渲染的，上级传入的props都是直接传给HOC的，所以HOC组件拥有很大的权限去修改props和控制渲染。

#### 增删改props
例如要增加一个公共性props
```javascript
function HOCFactory(WrappedComponent){
  return HOC extends React.component{
    render(){
      let props = {
        ...this.props,
        message: "a common string"
      }
      <WrapperComponent {...props} />
    }
  }
}
---------- 这样在组件里就可以使用
class MyComponent extends React.Component {
  render(){
    return (<div>{this.props.message}</div>)
  }
}
export default control(MyComponent)
```

#### 渲染劫持
这里的渲染劫持并不是你能控制它渲染的细节，而是控制是否去渲染。由于细节属于组件内部的render方法控制，所以你无法控制渲染细节。

比如，组件要在data没有加载完的时候，现实loading...，就可以这么写：这个样子，在父级没有传入data的时候，这一块儿就只会显示loading...,不会显示组件的具体内容

```javascript
  function loading(WrappedComponent){
    return class Loading extends React.Component{
      render(){
        if(!this.props.data){
          return <div>loading</div>
        }
        return <WrappedComponent {...props} />
      }
    }
  }
```
#### 页面权限管理
可以通过HOC对组件进行包裹，当跳转到当前页面的时候，检查用户是否含有对应的权限。如果有的话，渲染页面。如果没有的话，跳转到其他页面(比如无权限页面，或者登陆页面)。

### HOC 注意事项
#### 不要随意修改props

#### Ref无法获取想要的ref

#### Component上绑定的static方法丢失 

比如，你原来在Component上面绑定了一些static方法MyComponent.staticMethod = o=>o。但是由于经过HOC的包裹，父级组件拿到的已经不是原来的组件了，所以当然无法获取到staticMethod方法了。  
这里有一个解决方法，就是hoist-non-react-statics组件，这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上：
```javascript
  import hoistNonReactStatic from 'hoist-non-react-statics';
  function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
  }
```




