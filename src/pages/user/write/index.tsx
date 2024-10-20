import { useEffect, useState } from "react";
import Vditor from "vditor";
import style from "./index.module.less";
import "vditor/dist/index.css";
import { Button } from "antd";

const App = () => {
  const [vd, setVd] = useState<Vditor>();
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      mode: "sv",
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例");
        setVd(vditor);
      },
    });
    // Clear the effect
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);
  return (
    <div className={style.writeWP}>
      <div className={style.operaBtns}>
        <Button type="primary">发布</Button>
      </div>
      <div id="vditor" className="vditor" />
    </div>
  );
};

export default App;
