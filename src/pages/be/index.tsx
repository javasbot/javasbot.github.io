import { useEffect } from "react";
import { List, Typography } from "antd";
import style from "./index.module.less";
import { post } from "@/utils/request";
import useCustomReducer from "@/hooks/useCusReducer";
import { Link, useNavigate } from "react-router-dom";
export default function BFE() {
  const nav = useNavigate();
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
            <Typography.Link
              onClick={() => {
                nav(`/user/write`, {
                  state: { url: item.download_url },
                });
              }}
            >
              {item.title}
            </Typography.Link>
          </List.Item>
        )}
      />
    </div>
  );
}
