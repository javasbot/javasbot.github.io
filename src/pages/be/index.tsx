import { useEffect } from "react";
import { List } from "antd";
import style from "./index.module.less";
import { post } from "@/utils/request";
import useCustomReducer from "@/hooks/useCusReducer";
import { Link } from "react-router-dom";
export default function BFE() {
  const [state, dispatch] = useCustomReducer({
    article: [],
  });

  useEffect(() => {
    async function getList() {
      const res: any = await post("/user/posts", { articleType: "BE" });
      if (res) {
        dispatch("article", res.articles);
      }
    }
    getList();
  }, []);
  return (
    <div className={style.BEWP}>
      <List
        size="large"
        bordered
        dataSource={state.article}
        renderItem={(item: any) => (
          <List.Item>
            <Link target="_blank" to={item.link}>
              {item.title}
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
