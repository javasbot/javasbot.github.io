import { useEffect, useState } from "react";
import style from "./App.module.less";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(Date().toLocaleString());
  }, []);

  return (
    <div className="App">
      gao's blog
      <ul><li>gogogo</li></ul>
      <footer className={style.footer}> &copy; {time}</footer>
    </div>
  );
}

export default App;
