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


### let const
let只在对应上下文中存在
