import { useEffect, useState, useRef } from "react";
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
import { HomeMediaCom } from "@components";
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
  const videoRef = useRef<any>();
  const homeWPRef = useRef<any>();
  const bgVideoRef = useRef<any>();

  useEffect(() => {
    if (pathname === "/") {
      sessionStorage.setItem("pageKey", "");
      const parentHeight = homeWPRef.current.clientHeight;
      videoRef.current.style.height = `${parentHeight}px`;
      bgVideoRef.current.style.height = `${parentHeight}px`;
    } else {
      const key = pathname.replace("/", "");
      setCurrent(key);
    }
  }, [pathname]);

  useEffect(() => {
    function stopOtherVideo() {
      if (videoRef.current?.paused) {
        bgVideoRef.current.pause(); // 停止video2的播放
      }
    }
    if (pathname === "/") {
      videoRef.current.addEventListener("ended", stopOtherVideo);
    }
    return () => {
      if (pathname === "/") {
        videoRef.current.addEventListener("ended", stopOtherVideo);
      }
    };
  }, []);

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className={style.App}>
      <header className={style.header}>
        <Menu className={style.menu} selectedKeys={[current]} mode="horizontal" items={items} />
        {pathname !== "/" && (
          <Affix offsetTop={200} className={style.affix}>
            <Tooltip title="回到首页">
              <div className={style.homeIcon} onClick={toHome}></div>
            </Tooltip>
          </Affix>
        )}
        <div className={style.tipImg}></div>
      </header>
      {pathname === "/" ? (
        <div className={style.homeWP} ref={homeWPRef}>
          <HomeMediaCom />
          <video
            ref={bgVideoRef}
            className={style.bgVideo}
            muted={true}
            loop
            src="./rains-s.mp4"
            autoPlay
          ></video>
          <video
            muted={true}
            ref={videoRef}
            src="./wukong.mp4"
            autoPlay
          ></video>
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
