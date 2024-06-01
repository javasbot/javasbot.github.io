import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Button } from "antd";
import style from "./App.module.less";

function App() {
  useEffect(() => {}, []);
  const nodeRef = useRef<any>();
  const [show, setShow] = useState(true);

  useEffect(() => {
    nodeRef.current!.addEventListener("click", () => {
      console.log("ref点击事件");
    });
  }, []);

  const click = () => {
    console.log("react点击事件");
  };

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className={style.App}>
      <header className={style.header}>header</header>
      <section className={style.container}>
        <div
          className={classnames(style.content, !show && style.hidden)}
          ref={nodeRef}
          onClick={click}
        >
          我是隐藏元素
        </div>
        <Button type="primary" className={style.btn} onClick={toggle}>
          显隐
        </Button>
        <div className={style.wp}>存在的元素</div>
      </section>
      <footer className={style.footer}>footer</footer>
    </div>
  );
}

export default App;
