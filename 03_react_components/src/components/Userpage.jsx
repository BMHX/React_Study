import UserProfile from "./UserProfile";
import { useState } from "react";

const UserPage = () => {
  const [user, setUser] = useState({ name: "张三", age: 20 });

  const handleAgeChange = () => {
    setUser((user) => ({ ...user, age: user.age + 1 }));
  };

  return (
    <>
      <UserProfile
        name={user.name}
        age={user.age}
        onAgeChange={handleAgeChange}
      />
    </>
  );
};

export default UserPage;
