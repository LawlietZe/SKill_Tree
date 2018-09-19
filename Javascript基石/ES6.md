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

### 箭头函数（Arrow）
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



### let const
let只在对应上下文中存在
