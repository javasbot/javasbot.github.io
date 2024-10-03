// import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegisterForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('https://gaoserver-jaygao.ladeapp.com/user/register', values);
      if (response.status === 200) {
        message.success('注册成功，请登录');
        form.resetFields();
      }
    } catch (e: any) {
      const { message: errorMessage = '' } = e?.response?.data || {};
      message.error(errorMessage || '注册失败，请重试');
    }
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
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
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
