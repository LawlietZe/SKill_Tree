### box formatting context

#### box  
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
#### Formatting context 
W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。
CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。

#### BFC规则
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。 
规则：
1. 内部的box会在垂直方向一个一个堆叠
2. 上下之间的距离由margin来决定，属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

生成bfc的元素：
1. 根元素
2. float属性不为none
3. position为absolute或fixed
4. display为inline-block, table-cell, table-caption, flex, inline-flex
5. overflow不为visible

生成bfc主要使用overflow: hidden
