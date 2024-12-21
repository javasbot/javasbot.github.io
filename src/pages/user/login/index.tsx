import type { TabsProps } from "antd";
import { Tabs } from "antd";
import RegisterForm from "./RegisterForm.tsx";
import LoginForm from "./LoginForm.tsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const [searchParams, _] = useSearchParams();
  let initialKey = "1";
  if (searchParams.get("type") === "register") {
    initialKey = "2";
  }
  const [curKey, setCurKey] = useState(initialKey);

  const handleChange = (key: string) => {
    setCurKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "登录",
      children: <LoginForm />,
    },
    {
      key: "2",
      label: "注册",
      children: <RegisterForm handleOk={() => handleChange("1")} />,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>用户管理系统</h1>
      <Tabs
        items={items}
        activeKey={curKey}
        centered
        onChange={handleChange}
      ></Tabs>
    </div>
  );
};

export default AuthPage;
