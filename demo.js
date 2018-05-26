// create a Object

//factory pattern
function createAHost(id, name, type, sex){
    var o = new Object();
    o = {
        id: id,
        name: name,
        type: type,
        sex: sex
    }
    return o;
}
var Benard = createAHost(1, 'Benard', 'engineer', 'man');
var Mayve = createAHost(2, 'Mayve', 'bartender', 'woman');
//优：解决了多次构造相同对象的繁琐，差：无法判断对象的类型




//constructor pattern  构造函数模式
function CreateHostLevel1(id, name, type, sex){ //构造函数大写
    this.id = id;
    this.name = name;
    this.type = type;
    this.sex = sex;
    this.say = function(){
        console.log("Hello, I'm " + this.name);
    }
}
var BenardVersion1 = new CreateHostLevel1(0001, 'Benard', 'engineer', 'man');
var Mayve = new CreateHostLevel1(0002, 'Mayve', 'bartender', 'woman');
//优点：没有显示的创造对象，直接讲属性和方法赋值给this，没有return
//缺点: 每次实例化都要创造一样的say,重复开辟了存储空间

// new 一个对象的过程
//1.创建一个新对象
var obj = {};
//将构造函数作用域指向给新的对象
CreateHostLevel1.call(obj);
//执行构造函数中的代码(为对象添加新的属性)
obj._prototype_ = CreateHostLevel1.prototype;
//返回新对象
var instant = obj;
//检测  BenardVersion1 instanceof CreateHostLevel1  （true)


// prototype pattern
// prototype , __proto__ , constructor,
//组合使用构造函数和原型
function CreateHostLevel2(id, name, type, sex){
    this.id = id;
    this.name = name;
    this.type = type;
    this.sex = sex;
}
CreateHostLevel2.prototype = {
    constructor: CreateHostLevel2,
    say: function(){
        console.log("Hello, I'm " + this.name);
    }
}
var BenardVersion2 = new CreateHostLevel2(0001, 'Benard', 'engineer', 'man');
var MayveVersion2 = new CreateHostLevel2(0002, 'Mayve', 'bartender', 'woman');
//  Object.getPrototypeOf(BenardVersion2) == BenardVersion2.__protp__ == CreateHostLevel2.prototype
BenardVersion2.style = "elegant";
// BenardVersion2.hasOwnProtery("style")


//动态原型模式
function CreateHostLevel2(id, name, type, sex){
    this.id = id;
    this.name = name;
    this.type = type;
    this.sex = sex;
    if(typeof this.say != "function"){
        CreateHostLevel2.prototype.say = function(){
            console.log("Hello, I'm " + this.name);
        }
    }
}

// parasitic pattern
function SpecialArray(){
    //创建数组
    var values = new Array();
    //添加值
    values.push.apply(values, arguments);
    //添加方法
    values.toPieString = function(){
        return this.join("|");
    }
    return values;
}
var colors = new SpecialArray("red","black");
colors.toPieString;
//durable pattern
function Person(name, age){
    var o = new Object();
    o.say = function(){
        alert(name)
    }
    return o;
}


//JS inherit  (ˇˍˇ）

//原型链模式继承
function ProtypeZero(){
    this.core = "solarValue";
    this.arr = [];
}
ProtypeZero.prototype.getProtoPower = function(){
    return this.core;
}
function TestModel1(){
    this.coreShall = "metal";
}
TestModel1.prototype = new ProtypeZero();
TestModel1.prototype.getProtoShell = function(){
    return this.coreShall;
}
function TestModel2(){
    this.coreShall = "wood";
}
TestModel2.prototype = new ProtypeZero();
TestModel2.prototype.getProtoShell = function(){
    return this.coreShall;
}
var instance1 = new TestModel1();
var instance2 = new TestModel2();
//缺点： 共享父级属性 arr 

//借用构造函数
function SuperRobot(name) {
    this.color = ['black'];
}
function SubRobot() {
    SuperRobot.call(this, "misteryMan");
}
var instance1 = new SubRobot();
var instance2 = new SubRobot();
instance1.color.push("red");
instance2.color.push("white");
//缺点: 没有继承父类protype

//组合继承
function SuperRobot(name) {
    this.name    = name;
    this.friends = ['a','b','c'];
}
SuperRobot.prototype.say = function () {
    console.log("i'm " + this.name);
}
function SubRobot(name, age) {
    SuperRobot.call(this, name);
    this.age = age;
}
SubRobot.prototype = new SuperRobot();
SubRobot.prototype.sayFriends = function () {
    console.log(this.friends + " my age" + this.age);
}
var instance1 = new SubRobot("chris", 12);
var instance2 = new SubRobot("bill", 24);