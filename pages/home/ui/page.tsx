import Link from "next/link";
import styles from "./home.module.scss";
function HomePage() {
  return (
    <div>
      <nav className={styles.nav}>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
        <div className={styles.authContainer}>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </nav>
      <div className={styles.mainContainer}>
        본 서비스는 로그인 이 후 서비스가 가능합니다.
      </div>
    </div>
  );
}

export default HomePage;
