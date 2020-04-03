待更新 [hooks](https://reactjs.org/docs/hooks-intro.html)
[React Hook的实现原理和最佳实践](https://zhuanlan.zhihu.com/p/75146261)
### Hooks 模拟生命周期  
1. constructor: 函数式组件不需要构造函数，可以通过useState初始化state.
2. ComponentDidMount: 使用useEffect,并且第二个参数为[].
3. ComponentDidUpdate: 使用useEffect
4. ComponentWillUnmout: 在useEffct return 函数中模拟
5. shouldComponentUpdate: 可以使用React.memo来进行props的浅比较
6. useCallback / useMemo： 缓存函数做优化



#### Hooks 是在React 16.8中新增的，它可以让你在函数组件中使用 state 或者其他react特性，在不使用class组件的前提下。
*Hooks 是完全向后兼容的。*
使用规则: 1.在函数式组件里使用 2.在函数最外层使用
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
useEffect可以使函数组件拥有生命周期的方法
useEffect会在每次render的时候执行，包括在第一次render
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```
Effects通过使用return 可以在函数组件unmount的状态里执行一些方法
```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}```
\
