import { useState } from "react";
import UserContext from "./UseContext";

const UseProvider = ( {children}) => {
    const [user, setUser] = useState({
        name: 'zhangsan',
        age: 25
    });
    return (
        <UserContext.Provider value = {{user , setUser}} >
            {children}
        </UserContext.Provider>
    )
}
export default UseProvider;