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
####导出(export)
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
```
导出函数 

``` javascript
//myModule.js
export function myModule(someArgs){
 return someArg
}
```
####导入(import)
定义好的模块输出以后可以在另外一个模块import引用
import {myModule} from 'myModule';
import {name, age} from

>心得:一条import 语句可以同时导入默认函数和其它变量。import defaultMethod, { otherMethod } from 'xxx.js';




### let const
let只在对应上下文中存在
