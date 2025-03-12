import { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((mode) => !mode);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
      }}
    >
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
        accusamus dolorum minima quidem itaque illum eligendi placeat ab. Error,
        velit praesentium cumque voluptas ullam illo facilis maiores culpa
        voluptate dolorum?
      </h2>
      <button onClick={toggleTheme}>
        切换到 {isDarkMode ? "白天" : "暗黑"} 模式
      </button>
    </div>
  );
};

export default ThemeToggle;
