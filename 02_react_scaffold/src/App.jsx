import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import TaskList from './componments/TaskList';


function App() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TaskList taskList />);
}

export default App
