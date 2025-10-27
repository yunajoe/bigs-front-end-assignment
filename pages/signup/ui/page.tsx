"use client";

import { SignUpParams } from "@/shared/types/auth";
import { checkUserNameValidation } from "@/shared/utils/auth-validation";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import styles from "./signup.module.scss";
function SignUpPage() {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValidUserName, setIsValidUserName] = useState(false);

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const isValid = checkUserNameValidation(value);
    // console.log("isValid ==>", isValid);
    setUserName(value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setName(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setConfirmPassword(value);
  };

  const handleSignUp = async (data: SignUpParams) => {
    console.log("Data", data);
    // await signUp(data);
  };

  const isActive =
    username.length > 0 &&
    name.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;
  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>로고 이미지</div>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" onChange={handleUserName} />
      </div>
      <div className={styles.inputContainer}>
        <label>닉네임</label>
        <input placeholder="닉네임을 입력해주세요" onChange={handleName} />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <FontAwesomeIcon icon={faEye} size="lg" color="#6b7280" />
        <input
          type="password"
          placeholder="8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합"
          onChange={handlePassword}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호 확인</label>
        <FontAwesomeIcon icon={faEyeSlash} size="lg" color="#6b7280" />

        <input
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          onChange={handleConfirmPassword}
        />
      </div>

      <button
        disabled={!isActive}
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() =>
          handleSignUp({
            username,
            name,
            password,
            confirmPassword,
          })
        }
      >
        회원가입 하기
      </button>
      <div className={styles.redirect}>
        <span>회원이신가요?</span>
        <Link href="/login">로그인하기</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
