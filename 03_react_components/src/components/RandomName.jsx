import { useState } from 'react';

const RandomName = () => {
    const names = ["ChatGPT", "DeepSeek", "Kimi", "通义千问", "豆包"];
    const [name, setName] = useState("");
    const [count, setCount] = useState(0);

    const generateName = () => {
        const randomIndex = Math.floor(Math.random() * names.length);
        setName(names[randomIndex]);
        setCount(count + 1);
    };

    return (
        <div>
            <h1>{name || "点击生成一个名字"}</h1>
            <button onClick={generateName}>点击生成名字</button>
            <p>已生成次数: {count}</p>
        </div>
    );
};

export default RandomName;
