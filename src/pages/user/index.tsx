import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./index.module.less";
function UserCenter() {
  const navigate = useNavigate();
  const handleWrite = () => {
    navigate("/user/write");
  };
  return (
    <div className={style.userCenter}>
      <Button type="primary" onClick={handleWrite}>
        写文章
      </Button>
    </div>
  );
}
export default UserCenter;
