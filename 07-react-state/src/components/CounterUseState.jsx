import React, { useState } from 'react';

const CounterUseState = () => {
    //通过useState创建本地状态初始值为0
    const [count, setCount] = useState(0);

    //返回一个包含当前count状态和更新该状态的setCount函数的数组

    return (
        <div>
            <p>计数器：{count} </p>
            <button onClick={() => setCount(count + 1)}> 增加 </button>
            <button onClick={() => setCount(count - 1)}> 减少 </button>
        </div>
    )
}


export default CounterUseState;
