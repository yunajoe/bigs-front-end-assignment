/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuthStore } from "@/feature/auth/auth-store";
import { AUTH_ERROR_MESSAGE } from "@/shared/const/auth-validation";
import { SignInParams } from "@/shared/types/auth";
import {
  checkPasswordValidation,
  checkUserNameValidation,
} from "@/shared/utils/auth-validation";
import { customError } from "@/shared/utils/axios-validation";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "../api";
import styles from "./signin.module.scss";

function SignInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const router = useRouter();
  const { setTokens } = useAuthStore();

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUserName(value);
    const validUserName = checkUserNameValidation(value);
    setValidUserName(validUserName);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);

    const validPassword = checkPasswordValidation(value);
    setValidPassword(validPassword);
  };

  const handleSignIn = async (data: SignInParams) => {
    try {
      const { status, accessToken, refreshToken } = await signIn(data);
      if (status === 200) {
        setTokens(accessToken, refreshToken);
        alert("로그인에 성공하였습니다.");
      }
      router.push("/signin");
    } catch (error: any) {
      const errorResult = customError(error.type, error);
      alert(errorResult?.message);
    }
  };
  const isActive = validUserName && validPassword;

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoTitle}>
          BIGS PAYMENTS
        </Link>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" onChange={handleUserName} />
        {!validUserName && username.length > 0 && (
          <p className={styles.error}>{AUTH_ERROR_MESSAGE.username}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <div className={styles.inputRelativeContainer}>
          <input
            type={showPassword ? "" : "password"}
            placeholder="8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합"
            onChange={handlePassword}
          />
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
        {!validPassword && password.length > 0 && (
          <p className={styles.error}>{AUTH_ERROR_MESSAGE.password}</p>
        )}
      </div>

      <button
        disabled={!isActive}
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() => {
          handleSignIn({
            username,
            password,
          });
        }}
      >
        로그인 하기
      </button>
      <div className={styles.redirect}>
        <span>회원이 아니신가요?</span>
        <Link href="/signup">회원가입하기</Link>
      </div>
    </div>
  );
}

export default SignInPage;
