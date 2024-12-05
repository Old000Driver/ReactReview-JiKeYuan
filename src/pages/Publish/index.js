import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { createArticleAPI, getChannelAPI } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  const [form] = Form.useForm();
  const { channelList } = useChannel();

  const onFinish = (formValue) => {
    console.log("formValue", formValue);
    if (imagesList.length !== imageType)
      return message.warning("封面类型和图片数量不匹配");
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imagesList.map((item) => item.response.data.url),
      },
      channel_id,
    };
    createArticleAPI(reqData);
  };

  const [imagesList, setImageList] = useState([]);
  const onChange = (value) => {
    console.log("上传中", value);
    setImageList(value.fileList);
  };

  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    console.log("切换封面了", e.target.value);
    setImageType(e.target.value);
  };

  return (
    <div className="publish">
      <Card
        title={
          // <Breadcrumb separator=">">
          //   <Breadcrumb.Item>
          //     <Link to="/">首页</Link>
          //   </Breadcrumb.Item>
          //   <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          // </Breadcrumb>
          <Breadcrumb
            items={[{ title: <Link to="/">首页</Link> }, { title: "发布文章" }]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                /* 便利channelLIst渲染列表 */
                channelList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                action={"http://geek.itheima.net/v1_0/upload"}
                showUploadList
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
