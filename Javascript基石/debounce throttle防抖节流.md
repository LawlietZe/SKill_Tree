https://www.cnblogs.com/fsjohnhuang/p/4147810.html


debounce应用场景：Input连续输入     
输入搜索联想，用户在不断输入值时，用防抖来节约请求资源。  
按钮点击:收藏,点赞,心标等

```js
定时器版本，使用箭头函数可以省略绑定this的过程
var debounce = function(fn, delay) {
 let time = null;
 return function(...args) {
    // let that = this, setTimeout 时候会丢失this 因此在这里绑定，也可以用尖头函数代替
    // ...args 是把函数参数转化成args数组
    time && clearTimeout(time)
    time = setTimeout(()=> {
        fn.apply(this, args)
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

时间戳版本
function throttle(fn, delay=500) {
 let last = 0
 return function(...args) {
    let now = new Date().getTime();
    if(now - last > delay) {
       last = now
        fn.apply(args)
    }
 }
}

//定时器版
function throttle(fn, delay = 500) {
 let time = null
 return function(...args) {
  let that = this
  if(!time){
   time = setTimeout(()=>{
    time = null
    fn.apply(that, args)
   } , delay)
  }
 }
}


```
