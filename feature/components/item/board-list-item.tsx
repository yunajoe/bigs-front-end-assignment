import { getPost } from "@/pages/post/api";
import { PostItem } from "@/shared/types/board";
import { formattingTime } from "@/shared/utils/time";
import Image from "next/image";
import { Suspense, use } from "react";
import styles from "./boradListItem.module.scss";

interface BoardListItemProps {
  id: string | string[];
}

interface PostItemResponse {
  data: PostItem;
  status: number;
}

interface BoardListItemContentProps {
  data: Promise<PostItemResponse>;
}

function BoardListItemContent({ data }: BoardListItemContentProps) {
  const post = use(data);
  if (post.status !== 200) {
    return <p>포스트를 불러 올 수 없습니다.</p>;
  }

  const { id, title, content, imageUrl, boardCategory, createdAt } = post.data;

  return (
    <div className={styles.item}>
      <div className={styles.meta}>
        <span>{boardCategory}</span>
        <p> {formattingTime(createdAt)}</p>
      </div>
      <div className={styles.title}>{title}</div>
      <p>{content}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          style={{ width: "100%", borderRadius: "6px" }}
        />
      )}
    </div>
  );
}

function BoardListItem({ id }: BoardListItemProps) {
  const data = getPost(Number(id));
  return (
    <Suspense
      fallback={<p className={styles.loading}>게시판 불러오는 중...</p>}
    >
      <BoardListItemContent data={data} />
    </Suspense>
  );
}

export default BoardListItem;
