"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import styles from "./signin.module.scss";

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <div className={styles.inputRelativeContainer}>
          <input placeholder="8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합" />
          <FontAwesomeIcon
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            icon={showPassword ? faEye : faEyeSlash}
            size="lg"
            color="#6b7280"
            className={styles.icon}
          />
        </div>
      </div>

      <button className={styles.button}>로그인 하기</button>
      <div className={styles.redirect}>
        <span>회원이 아니신가요?</span>
        <Link href="/signup">회원가입하기</Link>
      </div>
    </div>
  );
}

export default SignInPage;
