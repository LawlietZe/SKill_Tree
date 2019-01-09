### why SSR?
1. 首屏渲染速度比较慢
2. seo无法爬取
解决：首屏ssr , 后续spa

## renderToString和renderToStaticMarkup
  1.renderToString：将React Component转化为HTML字符串，生成的HTML的DOM会带有额外属性：各个DOM会有data-react-id属性，第一个DOM会有data-checksum属性。

  2.renderToStaticMarkup：同样是将React Component转化为HTML字符串，但是生成HTML的DOM不会有额外属性，从而节省HTML字符串的大小。
  
