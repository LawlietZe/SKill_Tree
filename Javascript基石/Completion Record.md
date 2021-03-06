Completion Record 表示一个语句执行完之后的结果，它有三个字段：  
[[type]] 表示完成的类型，有 break continue return throw 和 normal 几种类型；   
[[value]] 表示语句的返回值，如果语句没有，则是 empty；  
[[target]] 表示语句的目标，通常是一个 JavaScript 标签（标签在后文会有介绍）。  
JavaScript 正是依靠语句的 Completion Record 类型，方才可以在语句的复杂嵌套结构中，实现各种控制。接下来我们要来了解一下 JavaScript 使用 Completion Record 类型，控制语句执行的过程。
```js
{
  var i = 1; // normal, empty, empty
  i ++; // normal, 1, empty
  console.log(i) //normal, undefined, empty
} // normal, undefined, empty
```
![img](https://static001.geekbang.org/resource/image/98/d5/98ce53be306344c018cddd6c083392d5.jpg)
![img](https://static001.geekbang.org/resource/image/77/d3/7760027d7ee09bdc8ec140efa9caf1d3.png)
