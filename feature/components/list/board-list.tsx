import { getPosts } from "@/pages/home/api";
import { Post } from "@/shared/types/board";
import { Suspense, use } from "react";
import styles from "./boardList.module.scss";

interface BoardListContentProps {
  data: Promise<any>;
}

function BoardListContent({ data }: BoardListContentProps) {
  const allPosts = use(data);
  console.log("allPosts ===>>>", allPosts);

  if (allPosts.status !== 200) {
    return <p>포스트를 불러 올 수 없습니다.</p>;
  }

  return (
    <div className={styles.postTable}>
      <div className={styles.tableHeader}>
        <span>아이디</span>
        <span>제목</span>
        <span>카테고리</span>
        <span>생성날짜</span>
      </div>

      {allPosts.data.content.map((post: Post) => {
        const { id, title, category, createdAt } = post;
        return (
          <div key={id} className={styles.post}>
            <li>{id}</li>
            <li>{title}</li>
            <li>{category}</li>
            <li>{createdAt}</li>
          </div>
        );
      })}
    </div>
  );
}

export default function BoardList() {
  const data = getPosts();

  return (
    <Suspense fallback={<p>게시판 불러오는 중</p>}>
      <BoardListContent data={data}></BoardListContent>
    </Suspense>
  );
}
