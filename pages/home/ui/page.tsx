"use client";
import { useAuthStore } from "@/feature/auth/auth-store";
import { useBoardStore } from "@/feature/board/board-store";
import WritePost from "@/feature/components/form/write-post";
import BoardList from "@/feature/components/list/board-list";
import Modal from "@/feature/components/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./home.module.scss";

function HomePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const username = useAuthStore((state) => state.username);
  const isWriteModalOpen = useBoardStore((state) => state.isWriteModalOpen);
  const { openWriteModal, closeWriteModal } = useBoardStore.getState();
  const { clearTokens, clearUserName } = useAuthStore.getState();

  const router = useRouter();

  const handleSignOut = () => {
    clearTokens();
    clearUserName();
  };

  const handleWritePost = () => {
    openWriteModal();
  };

  return (
    <div>
      {!accessToken ? (
        <nav className={styles.nav}>
          <span className={styles.logoTitle}>BIGS PAYMENTS</span>
          <div className={styles.authContainer}>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <span className={styles.logoTitle}>BIGS PAYMENTS</span>
          <div className={styles.authContainer}>
            <Link href="/" onNavigate={handleSignOut}>
              로그아웃
            </Link>
          </div>
        </nav>
      )}

      <p className={styles.guideText}>
        {!accessToken
          ? "본 서비스는 로그인 이 후 서비스가 가능합니다."
          : `안녕하세요 ${username}님 반갑습니다.`}
      </p>

      {/* 게시판 컨텐츠 */}
      {!accessToken ? (
        <div className={styles.mainContainer}>
          <div className={styles.guideContainer}>
            <h2>로그인이 필요합니다</h2>
            <p>게시판을 이용하시려면 로그인해주세요</p>
            <button
              className={styles.button}
              onClick={() => {
                router.push("/signin");
              }}
            >
              로그인하기
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.boardContainer}>
            <nav className={styles.boardNavigation}>
              <h3>게시판</h3>
              <button onClick={handleWritePost}>글쓰기</button>
            </nav>
            <div className={styles.boardCategories}>
              <div className={styles.categoryButtonContainer}>
                <button>전체</button>
                <button>공지</button>
                <button>자유</button>
                <button>Q&A</button>
                <button>기타</button>
              </div>
              <div className={styles.categorySearchContainer}>
                <input />
                <button>검색</button>
              </div>
            </div>
            {/* posts 리스트 */}
            <BoardList />
          </div>
        </div>
      )}
      <Modal isModalOpen={isWriteModalOpen} closeModal={closeWriteModal}>
        <WritePost />
      </Modal>
    </div>
  );
}

export default HomePage;
