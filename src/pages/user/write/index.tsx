import { useEffect, useState } from "react";
import Vditor from "vditor";
import style from "./index.module.less";
import "vditor/dist/index.css";
import { post } from "@/utils/request";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { articleTypes } from "@/constants/commonTypes";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [vd, setVd] = useState<Vditor>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      mode: "sv",
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例");
        setVd(vditor);
      },
    });

    // Clear the effect
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);

  const handlePublish = () => {
    setIsModalVisible(true);
  };

  // 定义 ValidationError 类型

  const handleOk = async () => {
    // 验证表单字段，如果有错误会抛出异常
    await form.validateFields();

    // 获取所有字段的值
    const values = form.getFieldsValue();
    // 获取富文本编辑器的内容
    const content = vd?.getValue();

    if (!content) {
      return;
    }

    // 发送请求
    const response: any = await post("/user/write", {
      category: values.category,
      title: values.title,
      content: content,
    });

    // 根据响应显示成功或错误模态框
    if (response?.success) {
      message.success("文章已成功发布");
      // 成功后可以关闭弹窗并重置表单
      setIsModalVisible(false);
      form.resetFields();
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className={style.writeWP}>
      <div className={style.operaBtns}>
        <Button type="primary" onClick={handlePublish}>
          发布
        </Button>
      </div>
      <div id="vditor" className="vditor" />
      <Modal
        title="发布文章"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="category"
            label="文章分类"
            rules={[{ required: true, message: "请选择文章分类" }]}
          >
            <Select
              placeholder="请选择文章分类"
              options={articleTypes}
            ></Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Write;
