import CounterUseState from "./components/CounterUseState"
import Profile from "./components/Profile"
import TodoList from "./components/TodoList"
import UserProvider from "./components/UserProvider";
import UserProfile from "./components/UserProfile";
import UpdateUser from "./components/UpdateUser";
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from "./store/actions";
function App() {
 const count = useSelector((state) => state.count);
 const dispath = useDispatch()

  return (
    <>
    <div>
      <CounterUseState />
      <Profile />
      <TodoList />
    </div>
    <div>
      <UserProvider>
        <UserProfile />
        <UpdateUser />
      </UserProvider>
    </div>

    </>
  );
}

export default App
