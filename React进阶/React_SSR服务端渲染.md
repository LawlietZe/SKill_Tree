### why SSR?
1. 首屏渲染速度比较慢
2. seo无法爬取
解决：首屏ssr , 后续spa

## renderToString和renderToStaticMarkup
  1.renderToString：将React Component转化为HTML字符串，生成的HTML的DOM会带有额外属性：各个DOM会有data-react-id属性，第一个DOM会有data-checksum属性。

  2.renderToStaticMarkup：同样是将React Component转化为HTML字符串，但是生成HTML的DOM不会有额外属性，从而节省HTML字符串的大小。
  
Express 搭建相关server ,  server返回html骨架， renderToString渲染react 组件， 引入 app.js静态文件作为资源引入, 通过对比算法
React不会二次渲染相同组件， 配置 server 中 redux 和 router, 使其与 client中的 store 保持一致，以及通过url. 链接到指定 页面
(ssr基本配置)[https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4]
