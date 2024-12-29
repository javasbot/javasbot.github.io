import { useEffect } from "react";
import { post } from "@/utils/request";
import style from "./index.module.less";
import useCustomReducer from "@/hooks/useCusReducer";
import ArticleList from "@/components/articleList";
export default function AI() {
  const [state, dispatch] = useCustomReducer({
    article: [],
  });

  useEffect(() => {
    async function getList() {
      const res: any = await post("/user/posts", { articleType: "AI" });
      if (res) {
        dispatch("article", res.articles);
      }
    }
    getList();
  }, []);
  return (
    <div className={style.aiContainer}>
      <ArticleList postList={state.article} />
    </div>
  );
}
