import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Menu, Tooltip, Typography, Button, Avatar } from "antd";
import classnames from "classnames";
import style from "./App.module.less";
import { menuItems } from "@/constants/menus";
import { getItem } from "@/utils/storage";
import useCustomReducer from "@/hooks/useCusReducer";

const { Link: LinkCom } = Typography;

function App() {
  const [state, dispatch] = useCustomReducer({
    username: "",
  });
  const { username } = state;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const username = getItem("username");
    if (username) {
      dispatch("username", username);
    }
  }, []);

  const toHome = () => {
    navigate("/");
  };

  const handleUser = (type = "") => {
    const url = type ? `/user/login?type=${type}` : "/user/login";
    navigate(url);
  };

  const handleUserHome = () => {
    navigate("/user/home");
  };

  return (
    <div className={style.App}>
      {pathname !== "/" && (
        <div className={style.affix}>
          <Tooltip title="回到首页">
            <div className={style.homeIcon} onClick={toHome}></div>
          </Tooltip>
        </div>
      )}
      <header className={style.header}>
        <Menu className={style.menu} mode="horizontal" items={menuItems} />
        {username ? (
          <div className={style.user}>
            <Button
              onClick={handleUserHome}
              className={style.info}
              type="primary"
            >
              个人中心
            </Button>
            <Avatar src="./avatar.png" />
            <span className={style.username}>{username}</span>
          </div>
        ) : (
          <div className={style.btns}>
            <Button
              type="primary"
              onClick={() => handleUser()}
              size="large"
              className={style.login}
            >
              登录
            </Button>
            <Button
              onClick={() => handleUser("register")}
              size="large"
              className={style.register}
            >
              注册
            </Button>
          </div>
        )}
      </header>
      {pathname === "/" ? (
        <article className={style.article}>
          记录知识在：
          <LinkCom href="https://github.com/javasbot/javasbot.github.io/issues">
            issue区
          </LinkCom>
        </article>
      ) : (
        <div
          className={classnames(
            style.container,
          )}
        >
          <Outlet />
        </div>
      )}
      <footer className={style.footer}>
        &copy;版权所有，只有一点点 Knowledge Science Art Truth Fairness Justice
      </footer>
    </div>
  );
}

export default App;
