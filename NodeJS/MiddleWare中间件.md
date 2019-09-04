

用来做api组合，前端负责自己整合自己需要的接口形式
基础:任何语言
推荐: node express中间件


Express中间件：
1.应用级中间件
app.use() and app.METHOD() 
```javascript
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```
2.路由级中间件
