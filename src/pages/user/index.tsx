// import React from 'react';
import { Tabs } from 'antd';
import RegisterForm from './RegisterForm.tsx';
import LoginForm from './LoginForm.tsx';

const { TabPane } = Tabs;

const AuthPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>用户管理系统</h1>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="登录" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthPage;
