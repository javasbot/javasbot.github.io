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
      我的记录
      音乐
      电影
      好玩
      <footer className={style.footer}> &copy; {time}</footer>
    </div>
  );
}

export default App;
