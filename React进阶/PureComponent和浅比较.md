## React.PureComponent
React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.
If your React component’s render() function renders the same result given the same props and state, you can use React.PureComponent for a performance boost in some cases.

shouldComponentUpdate source code :
```javascript
shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
---只要其中一个不是就 shouldUpdate 为true
```

```javascript
const hasOwn = Object.prototype.hasOwnProperty
function is(x, y){
  if(x === y){
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else{
    return x !== x && y !== y
  }

}


```
[采样](https://www.imweb.io/topic/598973c2c72aa8db35d2e291)

```
在解析shallowEqual的源码之前，先来认识一下Object.is()，这个函数是用来比较两个值是否相等。

为什么要用这个来比较而不是 == 或者 === 呢？

==
首先先看 ==，由于JS是弱类型的，如果使用 == 进行比较，== 操作符会自动将 0，‘ ’（空字符串），null，undefined 转成布尔型false，这样就会出现

0 == ' '  // true
null == undefined // true
[1] == true // true
这显然是不符合预期的。所以JS为我们提供了全等操作符 ===，它不会进行类型转换，也就是说如果两个值一样，必须符合类型也一样。但是，它还是有两种疏漏的情况

+0 === -0 // true，但我们期待它返回false
NaN === NaN // false，我们期待它返回true
所以，Object.is修复了=== 这两种判断不符合预期的情况，

function(x, y) {
    // SameValue algorithm
    if (x === y) {
     // 处理为+0 != -0的情况
      return x !== 0 || 1 / x === 1 / y;
    } else {
    // 处理 NaN === NaN的情况
      return x !== x && y !== y;
    }
};


// 用原型链的方法
const hasOwn = Object.prototype.hasOwnProperty

// 这个函数实际上是Object.is()的polyfill
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

export default function shallowEqual(objA, objB) {
  // 首先对基本数据类型的比较
  if (is(objA, objB)) return true
  // 由于Obejct.is()可以对基本数据类型做一个精确的比较， 所以如果不等
  // 只有一种情况是误判的，那就是object,所以在判断两个对象都不是object
  // 之后，就可以返回false了
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  // 过滤掉基本数据类型之后，就是对对象的比较了
  // 首先拿出key值，对key的长度进行对比

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  // 长度不等直接返回false
  if (keysA.length !== keysB.length) return false
  // key相等的情况下，在去循环比较
  for (let i = 0; i < keysA.length; i++) {
  // key值相等的时候
  // 借用原型链上真正的 hasOwnProperty 方法，判断ObjB里面是否有A的key的key值
  // 属性的顺序不影响结果也就是{name:'daisy', age:'24'} 跟{age:'24'，name:'daisy' }是一样的
  // 最后，对对象的value进行一个基本数据类型的比较，返回结果
    if (!hasOwn.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}
```
