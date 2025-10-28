import Link from "next/link";
import styles from "./home.module.scss";
function HomePage() {
  return (
    <nav className={styles.nav}>
      <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      <div className={styles.authContainer}>
        <Link href="/signin">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </nav>
  );
}

export default HomePage;
