import { getPosts } from "@/pages/home/api";
import { Post } from "@/shared/types/board";
import { formattingTime } from "@/shared/utils/time";
import { Suspense, use, useState } from "react";
import styles from "./boardList.module.scss";

interface BoardListContentProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: Promise<any>;
}

function BoardListContent({
  currentPage,
  setCurrentPage,
  data,
}: BoardListContentProps) {
  const allPosts = use(data);

  if (allPosts.status !== 200) {
    return <p>포스트를 불러 올 수 없습니다.</p>;
  }

  const handlePageClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    const page = target.textContent;
    setCurrentPage(Number(page) - 1);
  };

  return (
    <div className={styles.postTable}>
      <div className={styles.tableHeader}>
        <span>아이디</span>
        <span>제목</span>
        <span>카테고리</span>
        <span>생성날짜</span>
        <span>관리</span>
      </div>

      {allPosts.data.content.map((post: Post) => {
        const { id, title, category, createdAt } = post;
        return (
          <div key={id} className={styles.post}>
            <li>{id}</li>
            <li>{title}</li>
            <li>{category}</li>
            <li>{formattingTime(createdAt)}</li>
            <div className={styles.buttonContainer}>
              <button>삭제</button>
              <button>수정</button>
            </div>
          </div>
        );
      })}
      <ul className={styles.paginationContainer}>
        {Array.from({ length: allPosts.data.totalPages }, (_, index) => {
          return (
            <li
              key={index}
              onClick={handlePageClick}
              className={index === currentPage ? styles.activePage : ""}
            >
              {index + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function BoardList() {
  const [currentPage, setCurrentPage] = useState(0);
  const data = getPosts(currentPage);

  return (
    <Suspense
      fallback={<p className={styles.loading}>게시판 불러오는 중...</p>}
    >
      <BoardListContent
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></BoardListContent>
    </Suspense>
  );
}
