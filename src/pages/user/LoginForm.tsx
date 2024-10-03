import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // https://gaoserver-jaygao.ladeapp.com
      const response = await axios.post(
        "http://localhost:3003/user/login",
        values
      );
      if (response.status === 200) {
        // 假设服务器返回一个 token
        const { token } = response.data;
        localStorage.setItem("token", token);
        message.success("登录成功");
        navigate("/dashboard"); // 假设登录后跳转到 dashboard 页面
      }
    } catch (error) {
      message.error("登录失败，请重试");
    }
  };

  return (
    <Form
      form={form}
      name="login"
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
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
