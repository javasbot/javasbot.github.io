import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { post } from "@/utils/request";
import { setItem } from "@/utils/storage";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res: any = await post("/user/login", values);
      console.log("res", res);
      if (res.token) {
        setItem("token", res.token);
        message.success("登录成功");
        navigate("/");
      }
    } catch (e) {}
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
