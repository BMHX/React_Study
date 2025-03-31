import React, { useState } from'react';

const TodoList = () => {
    const [todos, setTodos] = useState(['Trae生成React', 'React网络请求学习']);

    const addTodo = () => {
        setTodos([...todos, '新任务']); //添加新任务
    };

    const removeTodo = () => {
        setTodos(todos.slice(0,todos.length -1)); //删除最后一个任务
    }

    return ( 
        <div>
            <h3>代办事项</h3>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            <button onClick={addTodo}>添加任务</button>
            <button onClick={removeTodo}>删除任务</button>
        </div>
    )
}
export default TodoList;