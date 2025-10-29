"use client";

import { useAuthStore } from "@/feature/auth/auth-store";
import BoardListItem from "@/feature/components/item/board-list-item";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./post.module.scss";

function PostPage() {
  const params = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { clearTokens, clearUserName } = useAuthStore.getState();

  if (!params) return <p>해당 POST를 찾을 수 없습니다.</p>;

  const handleSignOut = () => {
    clearTokens();
    clearUserName();
  };

  return (
    <div className={styles.container}>
      {!accessToken ? (
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoTitle}>
            BIGS PAYMENTS
          </Link>
          <div className={styles.authContainer}>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoTitle}>
            BIGS PAYMENTS
          </Link>
          <div className={styles.authContainer}>
            <Link href="/" onNavigate={handleSignOut}>
              로그아웃
            </Link>
          </div>
        </nav>
      )}
      <BoardListItem id={params.id}></BoardListItem>;
    </div>
  );
}

export default PostPage;
