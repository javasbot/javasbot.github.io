import { useEffect, useState } from "react";
import {
  InstagramOutlined,
  DockerOutlined,
  KubernetesOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Outlet,
  useNavigation,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, Affix, Tooltip } from "antd";
import classnames from "classnames";
import style from "./App.module.less";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "FE",
    icon: <InstagramOutlined />,
    label: <Link to="/bfe">大前端</Link>,
  },
  {
    key: "BE",
    icon: <DockerOutlined />,
    label: <Link to="/be">后端</Link>,
  },
  {
    key: "AI",
    icon: <KubernetesOutlined />,
    label: <Link to="/ai">人工智能</Link>,
  },
];

function App() {
  const [current, setCurrent] = useState("");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      sessionStorage.setItem("pageKey", "");
      return;
    }
    const key = sessionStorage.getItem("pageKey")!;
    setCurrent(key);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    sessionStorage.setItem("pageKey", e.key);
  };

  const toHome = () => {
    navigate("/");
    setCurrent("");
    sessionStorage.setItem("pageKey", "");
  };

  return (
    <div className={style.App}>
      <header className={style.header}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Affix offsetTop={200} className={style.affix}>
          <Tooltip title="回到首页">
            <div className={style.homeIcon} onClick={toHome}></div>
          </Tooltip>
        </Affix>
      </header>
      {pathname === "/" ? (
        <div className={style.homeWP}>
          <video className={style.videoEl} src="./wukong.mp4" autoPlay></video>
        </div>
      ) : (
        <div
          className={classnames(
            style.container,
            navigation.state === "loading" ? style.loading : ""
          )}
        >
          <Outlet />
        </div>
      )}
      <footer className={style.footer}>&copy;版权所有，只有一点点</footer>
    </div>
  );
}

export default App;
