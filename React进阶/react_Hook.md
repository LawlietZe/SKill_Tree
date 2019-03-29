待更新 [hooks](https://reactjs.org/docs/hooks-intro.html)

## Hooks 初见
#### Hooks 是在React 16.8中新增的，它可以让你在函数组件中使用 state 或者其他react特性，在不使用class组件的前提下。
*Hooks 是完全向后兼容的。*

### State Hook

```javascript
import React, { useState } from 'react';
function Example(){
  // 在函数组件中添加state， react在重新render的时候保留这个state，useState返回一个配对：当前的值，和更新它的函数,更新函数不会像this.setState
  一样merge把新 老state在一起.
  const [count, setCount] = useState(0);
  // 这里的0代表初始化的值是0，不用像this.state一样是对象,只会在第一次render中使用
  return (
    <div>
      <p> You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```
声明多个state  
```javascript
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

```
### Effect Hook


