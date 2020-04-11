```js

function create(constructor, ...args){
    const obj = new Object()
    obj.__proto__ = constructor.prototype
    const res = constructor.apply(obj, args)
    return res instanceof Object ? res : obj
}

链接：https://juejin.im/post/5e5a759c6fb9a07ca301def9


```
