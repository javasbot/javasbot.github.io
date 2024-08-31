import { message } from "antd";
import { useEffect } from "react";
export default function ErrorPage() {
  useEffect(() => {
    message.error("无效的url地址");
  }, []);
  return <div>您来到了知识荒原</div>;
}
