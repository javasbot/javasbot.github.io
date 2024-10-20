import { getItem } from "./storage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function linkProtocol(url: string) {
  const navigate = useNavigate();
  const token = getItem("token");
  if (!token) {
    message.info("请先登录");
    navigate("/user/login");
  } else {
    navigate(url);
  }
}

export { linkProtocol };
