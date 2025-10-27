import Link from "next/link";
import styles from "./login.module.scss";

function LoginPage() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>로고 이미지</div>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <input placeholder="8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합" />
      </div>

      <button className={styles.button}>로그인 하기</button>
      <div className={styles.redirect}>
        <span>회원이 아니신가요?</span>
        <Link href="/signup">회원가입하기</Link>
      </div>
    </div>
  );
}

export default LoginPage;
