import { Typography, List } from "antd";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
interface IProps {
  item: {
    title: string;
    download_url: string;
    path: string;
  };
}
function ArticleLink({ item }: IProps) {
  const nav = useNavigate();
  return (
    <List.Item>
      <Typography.Link
        onClick={() => {
          nav(`/user/write`, {
            state: {
              url: item.download_url,
              title: item.title,
              path: item.path,
            },
          });
        }}
      >
        {item.title}
      </Typography.Link>
    </List.Item>
  );
}

export default memo(ArticleLink);
