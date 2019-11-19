https://www.cnblogs.com/fsjohnhuang/p/4147810.html


debounce应用场景：Input连续输入   
```
/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
debounce(idle,action)
var debounce = function(idle, action){
  var last;
  return function(){
    var ctx =this, args = arguments;
    clearTimeout(last)
    last = setTimeout(function(){
      action.apply(ctx, args)
    }, idle)
  }
}
```
throttle : resize . 
```
/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param delay  {number}    延迟时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
throttle(delay,action)

var throttle = function(delay, action){
  var last = return function(){
    var curr = +new Date()
    if(curr - last > delay){
      action.apply(this, arguments)
      last = curr
    }
  }
}
```
