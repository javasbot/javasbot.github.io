import { useEffect } from "react";
import style from "./index.module.less";
import ArticleList from "@/components/articleList";
import { post } from "@/utils/request";
import useCustomReducer from "@/hooks/useCusReducer";
export default function BFE() {
  const [state, dispatch] = useCustomReducer({
    article: [],
  });

  useEffect(() => {
    async function getList() {
      const res: any = await post("/user/posts", { articleType: "FE" });
      if (res) {
        dispatch("article", res.articles);
      }
    }
    getList();
  }, []);
  return (
    <div className={style.BFEWP}>
      <ArticleList postList={state.article} />
    </div>
  );
}
