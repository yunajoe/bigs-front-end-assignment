import { deletePost, getPost } from "@/pages/post/api";
import { PostItem } from "@/shared/types/board";
import { formattingTime } from "@/shared/utils/time";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const post = use(data);
  if (post.status !== 200) {
    return <p>포스트를 불러 올 수 없습니다.</p>;
  }

  const { id, title, content, imageUrl, boardCategory, createdAt } = post.data;

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      alert("글을 삭제하였습니다.");
      router.push("/");
    } catch (error) {
      alert("글을 삭제하는데 실패하였습니다.");
    }
  };

  const handleEdit = () => {};

  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <div className={styles.header}>
          <span className={styles.category}>카테고리: {boardCategory}</span>
          <p className={styles.date}>{formattingTime(createdAt)}</p>
        </div>
        <div className={styles.title}>제목: {title}</div>
        <p className={styles.content}>{content}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            style={{ width: "100%", borderRadius: "6px" }}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => handleDelete(id)}>삭제</button>
        <button>수정</button>
      </div>
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
