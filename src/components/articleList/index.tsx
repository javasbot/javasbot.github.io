import { List, Skeleton } from "antd";
import { memo } from "react";
import ArticleLink from "../articleLink";

function ArticleList({ postList }: any) {
  return postList?.length ? (
    <List
      size="large"
      bordered
      dataSource={postList}
      renderItem={(item: any) => <ArticleLink item={item} />}
    />
  ) : (
    <Skeleton />
  );
}

export default memo(ArticleList);
