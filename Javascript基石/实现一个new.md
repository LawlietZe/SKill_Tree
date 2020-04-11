解析请看 [JavaScript深入之new的模拟实现 #13](https://github.com/mqyqingfeng/Blog/issues/13#issue-226166710)

```js

function create(constructor, ...args){
    const obj = new Object()
    obj.__proto__ = constructor.prototype
    const res = constructor.apply(obj, args)
    return res instanceof Object ? res : obj
}

链接：https://juejin.im/post/5e5a759c6fb9a07ca301def9


```
