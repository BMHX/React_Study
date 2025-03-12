import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar user={user} />}
      <AppRoutes setUser={setUser} />
    </div>
  );
};

export default App;
