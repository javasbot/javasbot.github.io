import { useEffect, useState } from "react";
import classnames from "classnames";
import { Button } from "antd";
import style from "./App.module.less";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    // const parent = document.querySelector("#parent");
    // parent?.addEventListener(
    //   "click",
    //   (e) => {
    //     alert("父亲1");
    //     e.preventDefault();
    //     // e.stopPropagation()
    //   },
    //   {
    //     capture: true,
    //     passive: true,
    //   }
    // );
    // const res = isPalindrome(121);
    // console.log(res);
    // const son = document.querySelector("#son");
    // son?.addEventListener(
    //   "click",
    //   (e) => {
    //     alert("子");
    //     // e.preventDefault()
    //     // e.stopPropagation()
    //   },
    //   {
    //     capture: false,
    //   }
    // );
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [startAni, setStartAni] = useState(false);

  return (
    <div className={style.App}>
      <header className={style.header}>头部</header>
      <div className={style.content}>
        查看{startAni ? "true" : "false"}
        <div className={classnames(style.container, startAni ? style.ant : "")}>
          container内容
        </div>
      </div>
      <footer className={style.footer}>
        &copy; {time}
        <Button
          onClick={() => {
            setStartAni(true);
          }}
        >
          开始动画
        </Button>
        <Button
          onClick={() => {
            setStartAni(false);
          }}
        >
          结束动画
        </Button>
      </footer>
    </div>
  );
}

export default App;
