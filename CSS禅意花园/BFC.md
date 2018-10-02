### box formatting context

1. box  
box 是css布局的基本单位，页面是由各种box所组成的，每个box里面，有其自身的formatting context(决定如何渲染内部的box)
box不同，则内部的formatting context渲染规则就不同。
分类: 
```
   [ block-level ] box:display 属性为 block, list-item, table 的元素，
   会生成 block-level box。并且参与 block fomatting context
```
```
   [ inline-level ] box:display 属性为 inline, inline-block, inline-table 的元素，
   会生成 inline-level box。并且参与 inline formatting context
```
1. Formatting context 
W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。
CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。




