https://www.cnblogs.com/fsjohnhuang/p/4147810.html


debounce应用场景：Input连续输入     
输入搜索联想，用户在不断输入值时，用防抖来节约请求资源。  
按钮点击:收藏,点赞,心标等

```js
var debounce = function(fn, delay) {
 let time = null;
 return function(...args) {
    let that = this;
    time && clearTimeout(time)
    time = setTimeout(()=> {
        fn.apply(that, args)
    },delay)
  }
}

const input = document.getElementById('input')
input.oninput = debounce((e) => {
  console.log(e.target.value)
}, 1000)
```
throttle : resize . 
```js
/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param delay  {number}    延迟时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
// fn 是需要执行的函数
// wait 是时间间隔
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}
```
