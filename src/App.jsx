import React from "react";
import UnityGame from "./unity";
import Login from "./components/Login";

function App() {
  localStorage.setItem("unity_1", "hello from front ");
  return (
    <div className="App">
      <Login />
      <UnityGame />
    </div>
  );
}

export default App;
