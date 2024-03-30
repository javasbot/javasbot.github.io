import { useState } from "react";

function App() {
  const [count] = useState(0);
  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      <h2>{count}</h2>
    </div>
  );
}

export default App;
