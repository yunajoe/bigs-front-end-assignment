import Link from "next/link";
import styles from "./home.module.scss";
function HomePage() {
  const isLoggedIn = true;
  return (
    <div>
      <nav className={styles.nav}>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
        <div className={styles.authContainer}>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </nav>
      <p className={styles.guideText}>
        본 서비스는 로그인 이 후 서비스가 가능합니다.
      </p>
      <div className={styles.mainContainer}>
        <div className={styles.guideContainer}>
          <h2>로그인이 필요합니다</h2>
          <p>게시판을 이용하시려면 로그인해주세요</p>
          <button className={styles.button}>로그인하기</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
