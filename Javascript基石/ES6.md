列举常用新特性
- 类
- 模块化
- 箭头函数
- 函数参数默认值
- 模板字符串
- 解构赋值
- 延展操作符
- 对象属性简写
- Promise
- Let和Const

### 1.类(class)  
作用是使面向对象更简单和利于理解
``` javascript
  class Animal{
    // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name, color){
      this.name = name;
      this.color = color;
    }
    // toString 是原型对象上的属性
    tiString(){
      console.log('name:' + this.name + ',color:' + this.color);
     }
  }
  var animal = new Animal('dog','white');
  animal.toString();
   console.log(animal.hasOwnProperty('name')); //true
   console.log(animal.hasOwnProperty('toString')); // false
   console.log(animal.__proto__.hasOwnProperty('toString')); // true
  class Cat extends Animal{
     constructor(action){
        super('cat','white');
        this.action = action
      }
      toString(){
        console.log(super.toString());
      }
   }
   var cat = new Cat('catch');
   console.log(cat instanceof Cat); // true
   console.log(cat instanceof Animal); // true
```
---
### 2.模块化
#### 导出(export)
导出变量 

``` javascript
export const name = 'RainBow'
```
可以同时输出多个变量 

``` javascript
//test.js
const name = 'why';
const age  = 24;
export{name, age}
export default sex = 'male'
```
导出函数 

``` javascript
//myModule.js
export function myModule(someArgs){
 return someArg
}
```
#### 导入(import)
定义好的模块输出以后可以在另外一个模块import引用
import {myModule} from 'myModule';
import sex, {name, age} from 'test'

>心得:一条import 语句可以同时导入默认函数和其它变量。import defaultMethod, { otherMethod } from 'xxx.js';
---

###  3.箭头函数
箭头函数与包围它的代码共享同一个this,能帮你很好的解决this的指向问题。有经验的JavaScript开发者都熟悉诸如var self = this;或var that = this这种引用外围this的模式
#### 箭头函数的结构
箭头函数的箭头=>之前是一个空括号、单个的参数名、或用括号括起的多个参数名，而箭头之后可以是一个表达式（作为函数的返回值），或者是用花括号括起的函数体（需要自行通过return来返回值，否则返回的是undefined）。
``` javascript
()=>1
v=>v+1
(a,b)=>a+b
()=>{
 alert("foo")
}
e=>{
 if(e == 0){
    reutrn 0
  }
  return 1000/e
}

```
>心得：不论是箭头函数还是bind，每次被执行都返回的是一个新的函数引用，因此如果你还需要函数的引用去做一些别的事情（譬如卸载监听器），那么你必须自己保存这个引用

---
### 4.函数参数默认值
ES6支持在定义函数的时候为期设置默认值
```javascript
function foo(height = 50, color = 'red')
{
    // ...
}
不使用默认值：
function foo(height, color)
{
    var height = height || 50;
    var color = color || 'red';
    //...
}
```
函数参数默认值不仅能是代码变得更加简洁而且能规避一些问题

---
### 5.模板字符串
```javascript
var name = `Your name is ${first} ${last}.`
````
---
### 6.解构赋值
用途：快速提取数组或者对象中的值
```javascript
var foo = ["one", "two", "three", "four"];
var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three..
//如果你要忽略某些值，你可以按照下面的写法获取你想要的值
var [first, , , last] = foo;
console.log(first); // "one"
console.log(last); // "four"

var a, b; //先声明变量

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

```
如果没有从数组中的获取到值，你可以为变量设置一个默认值。
```javascript
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```
通过解构赋值可以方便的交换两个变量的值。
```javascript

var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```
获取对象中的值
```javascript
const student = {
  name:'Ming',
  age:'18',
  city:'Shanghai'  
};

const {name,age,city} = student;
console.log(name); // "Ming"
console.log(age); // "18"
console.log(city); // "Shanghai"

```
### 7.延展操作符
延展操作符...可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造对象时, 将对象表达式按key-value的方式展开。
#### 语法
>函数调用
```
myFun(...iterableObj);
```
>数组构造或字符串
```
[...iterable,'4',...'hello',6]
```
>构造对象时，进行克隆或者属性拷贝
```
let objClone = {...obj}
```
#### 应用场景
>在函数调用时
```javascript
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
//不适用延展操作符
sum.apply(null, numbers);
//使用延展操作符
sum(...numbers)
```
 
>构造数组
没有展开语法的时候，只能组合使用 push，splice，concat 等方法，来将已有数组元素变成新数组的一部分。有了展开语法, 构造新数组会变得更简单、更优雅：
```javascript
const stuendts = ['Jine','Tom']; 
const persons = ['Tony',... stuendts,'Aaron','Anna'];
conslog.log(persions)// ["Tony", "Jine", "Tom", "Aaron", "Anna"]

//连接多个数组
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];// 将 arr2 中所有元素附加到 arr1 后面并返回
//等同于
var arr4 = arr1.concat(arr2);

//合并对象
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }
```

### 8.对象属性简写
```
const name='Ming',age='18',city='Shanghai';
        
const student = {
    name,
    age,
    city
};
console.log(student);//{name: "Ming", age: "18", city: "Shanghai"}
```


### 10.let const
let只在对应上下文中存在
const不允许修改

---
## ES7 特性
### 1.Array.prototype.includes()
判断一个数组是否包含指定的值
```
let arr = [1,2,3];
arr.includes(1)
//true
```
### 2.指数操作符(**)
```
console.log(2**10)
//1024
```

---
## ES8新特性
### 1.async/wait
异步函数，解决回调问题
```javascript
login(username){
return new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('1000');
  },600)
})
}

getData(userId){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
       resolve('sucess')
      })

  })
}

//不使用asyn/await
doLogin(username){
  this.login(username)
  .then(val=>this,getData(val))
  .then(result=>{
    console.log(result)
  })
}

//使用async/await
async doLogin(username){
 const userId = await this.login(username);
 const result = await this.getData(userId)
 console.log(result)
}

```
---
```
async function charCountAdd(data1,data2){
  const d1 = await chartCount(data1);
  const d2 = await chartCount(data2);
  return d1+d2;
}
function chartCount(data){
return new Promise((resolve,reject)=>{
 setTimeout(() => {
      resolve(data.length);
    }, 1000);
})
}
//在并发下使用
async function chartCountAdd(data1, data2){
 const [d1,d2] = await Promise.all([charCount(data1),charCount(data2)]);
 return d1+d2
}
function charCount(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.length);
        }, 1000);
    });
}
```
### 2.Object.values()

Object.values()可以获取对象的所有value，作为数组表达出来
Object.keys 讲获取对象所有key，作为数组表达出来



