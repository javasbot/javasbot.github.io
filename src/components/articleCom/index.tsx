import { post } from "@/utils/request";
import { Typography } from "antd";
import style from "./articleCom.module.less";

interface IProps {
  item: {
    title: string;
    link: string;
    download_url: string;
  };
}

export default function ArticleCom({ item }: IProps) {
  const { download_url } = item;

  const handleClick = async () => {
    const res: any = await post("/user/postDetail", { download_url });
    console.log("res", res);
  };
  return (
    <div className={style.item} onClick={handleClick}>
      <Typography.Link>{item.title}</Typography.Link>
    </div>
  );
}
