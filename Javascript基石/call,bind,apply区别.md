```
  let obj = {name: 'tony'};
  
  function Child(name){
    this.name = name;
  }
  
  Child.prototype = {
    constructor: Child,
    showName: function(){
      console.log(this.name);
    }
  }
  var child = new Child('thomas');
  child.showName(); // thomas
  
  //  call,apply,bind使用
  child.showName.call(obj);
  child.showName.apply(obj);
  let bind = child.showName.bind(obj); // 返回一个函数
  bind(); // tony
```
call、apply与bind的差别


call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。


call、apply的区别


他们俩之间的差别在于参数的区别，call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

### 应用场景1 拼接数组
```
let arr1 = [1,2,3];
let arr2 = [4,5,6];

//数组的concat方法：返回一个新的数组
let arr3 = arr1.concat(arr2); 
console.log(arr3); // [1, 2, 3, 4, 5, 6]

console.log(arr1); // [1, 2, 3] 不变
console.log(arr2); // [4, 5, 6] 不变
// 用 apply方法
[].push.apply(arr1, arr2)
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // 不变
```
### 应用场景2 求数组中最值
```
let arr = [3,45,21,5,88]
Math.max.apply(null, arr)
Math.min.apply(null, arr)
或者
Math.max.call(null, ...arr)
Math.max(...arr)
```

### 类数组转化为数组
```
let trueArr = Array.prototype.slice.call(arrayLike)
```
### 判断数据类型
```
function isArray(obj){
    return Object.prototype.toString.call(obj) == '[object Array]'
}
isArray([]) // true
isArray('dot') // false
```

### 实现继承

```
function Person(name,age){
    // 这里的this都指向实例
    this.name = name
    this.age = age
    this.sayAge = function(){
        console.log(this.age)
    }
}
function Female(){
    Person.apply(this,arguments)//将父元素所有方法在这里执行一遍就继承了
}
let dot = new Female('Dot',2)
```


