import { message } from "antd";
import axios from "axios";

// 创建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.GAO_PREFIX,
  timeout: 5 * 60 * 1000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
    // 可以在这里添加其他默认头部信息
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如：在headers中添加token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data; // 直接返回data部分
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log("Bad Request");
          break;
        case 401:
          console.log(`response`, error.response.data);
          message.error(error.response.data.message)
          break;
        case 403:
          console.log("Forbidden");
          break;
        case 404:
          console.log("Not Found");
          break;
        case 500:
          console.log("Internal Server Error");
          break;
        default:
          message.error(error.response.data.message)
          console.log(`Unexpected error: ${error.response.status}`);
      }
    } else if (error.request) {
      // 客户端从未收到服务器响应的情况
      console.log("No response received");
    } else {
      // 设置请求时发生了一些事情，触发了一个错误
      console.log("Error", error.message);
    }
    return Promise.reject(error); // 返回错误给调用者处理
  }
);

export function get(url: string, params: any) {
  return service.get(url, { params });
}

export function post(url: string, data: any) {
  return service.post(url, data);
}
