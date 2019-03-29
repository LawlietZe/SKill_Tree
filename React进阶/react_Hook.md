待更新 [hooks](https://reactjs.org/docs/hooks-intro.html)

## Hooks 初见
#### Hooks 是在React 16.8中新增的，它可以让你在函数组件中使用 state 或者其他react特性，在不使用class组件的前提下。
*Hooks 是完全向后兼容的。*

### State Hook

```javascript
import React, { useState } from 'react';
function Example(){
  const [count, setCount] = useState(0);
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
