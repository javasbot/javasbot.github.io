// import React, { useState } from 'react';
import { Form, Input, Button, message } from "antd";
import { post } from "../../utils/request";

const RegisterForm = ({ handleOk }: any) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await post("/user/register", values);
      console.log("res", res, typeof res);
      if (res) {
        message.success("注册成功，请登录");
        handleOk();
      }
    } catch (e) {}
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入有效的邮箱地址" },
        ]}
      >
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
