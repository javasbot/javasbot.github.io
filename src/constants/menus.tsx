import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  DockerOutlined,
  KubernetesOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
const menuItems: MenuItem[] = [
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
  {
    key: "Architecture",
    icon: <KubernetesOutlined />,
    label: <Link to="/system_architecture">系统架构设计</Link>,
  },
];

export {
  menuItems
}
