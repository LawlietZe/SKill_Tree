在JavaScript里使用typeof判断数据类型，只能区分基本类型，即：number、string、undefined、boolean、object。
对于null、array、function、object来说，使用typeof都会统一返回object字符串。
要想区分对象、数组、函数、单纯使用typeof是不行的。在JS中，可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。
分为null、string、boolean、number、undefined、array、function、object、date、math。
1. 判断基本类型

Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(“abc”);// "[object String]"
Object.prototype.toString.call(123);// "[object Number]"
Object.prototype.toString.call(true);// "[object Boolean]"
