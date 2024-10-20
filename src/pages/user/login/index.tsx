// import React from 'react';
import { Tabs } from "antd";
import RegisterForm from "./RegisterForm.tsx";
import LoginForm from "./LoginForm.tsx";
import { useState } from "react";

const { TabPane } = Tabs;

const AuthPage = () => {
  const [curKey, setCurKey] = useState("1");

  const handleChange = (key: string) => {
    setCurKey(key);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>用户管理系统</h1>
      <Tabs activeKey={curKey} centered onChange={handleChange}>
        <TabPane tab="登录" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm handleOk={() => handleChange("1")} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthPage;
