### box formatting context

1. box  
box 是css布局的基本单位，页面是由各种box所组成的，每个box里面，有其自身的formatting context(决定如何渲染内部的box)
box不同，则内部的formatting context渲染规则就不同。
分类: 
>block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context
>inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context
