import Welcomeclass from "./components/WelcomClass";
import StudentFunc from "./components/StudentFunc";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Main from "./components/Main";
// import { Button } from "./components/Button";
// import UserPage from "./components/Userpage";
// import RegistPage from "./components/RegistPage";
// import Main from "./components/Main";
import Card from "./components/Card";

const handleClick = () => {
  alert("Click");
}
const App =() =>{
  return (
    <>
      {/* <Welcomeclass name="react!!!"/>
      <StudentFunc name="John Doe" age={20} studentId = "12"/> */}
      {/* <Header title="My Website" />
      <Main />
      <Footer /> */}
      {/* <Button text="Click Me" onClick={handleClick} /> */}
      {/* <UserPage /> */}
      {/* <RegistPage/> */}
      {/* <Main /> */}
      <Card 
        header={<h1>标题</h1>}
        body={<div>内容</div>}
        footer={<button>按钮</button>}
      />
    </>
  );
}

export default App;