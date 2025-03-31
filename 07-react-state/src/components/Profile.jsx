import React, { useState } from 'react';
const Profile = () => {
    //使用对象管理多个状态值
    const [user, setUser] = useState({
        name: '张三',
        age: 25    });

    //更新状态中的单个字段
    const updateAge = () =>{
        setUser((prevState) => ({
            ...prevState,
            age: prevState.age + 1,
        }));
    };

    return (
        <div>
            <p>姓名：{user.name}</p>
            <p>年龄：{user.age}</p>
            <button onClick={updateAge}>增加年龄</button>
        </div>
    )
}

export default Profile;