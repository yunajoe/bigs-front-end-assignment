"use client";

import { SIGN_UP_ERROR_MESSAGE } from "@/shared/const/auth-validation";
import { SignUpParams } from "@/shared/types/auth";
import {
  checkConfirmationPasswordValidation,
  checkNameValidation,
  checkPasswordValidation,
  checkUserNameValidation,
} from "@/shared/utils/auth-validation";
import { customError } from "@/shared/utils/axios-validation";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "../api";
import styles from "./signup.module.scss";

function SignUpPage() {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [validUserName, setValidUserName] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  const router = useRouter();

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUserName(value);
    const validUserName = checkUserNameValidation(value);
    setValidUserName(validUserName);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setName(value);

    const validName = checkNameValidation(value);
    setValidName(validName);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value);

    // password
    const validPassword = checkPasswordValidation(value);
    setValidPassword(validPassword);

    // confirmPassword
    const validConfirmPassword = checkConfirmationPasswordValidation(
      value,
      confirmPassword
    );
    setValidConfirmPassword(validConfirmPassword);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setConfirmPassword(value);

    const validConfirmPassword = checkConfirmationPasswordValidation(
      password,
      value
    );
    setValidConfirmPassword(validConfirmPassword);
  };

  const handleSignUp = async (data: SignUpParams) => {
    try {
      const status = await signUp(data);
      if (status === 200) {
        alert("회원가입에 성공하였습니다.");
        router.push("/");
      }

      // ㅎ
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResult = customError(error.type, error);
        alert(errorResult?.message);
      }
    }
  };

  const isActive =
    validUserName && validName && validPassword && validConfirmPassword;

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" onChange={handleUserName} />
        {!validUserName && username.length > 0 && (
          <p className={styles.error}>{SIGN_UP_ERROR_MESSAGE.username}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label>닉네임</label>
        <input placeholder="닉네임을 입력해주세요" onChange={handleName} />
        {!validName && name.length > 0 && (
          <p className={styles.error}>{SIGN_UP_ERROR_MESSAGE.name}</p>
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
          <p className={styles.error}>{SIGN_UP_ERROR_MESSAGE.password}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호 확인</label>
        <div className={styles.inputRelativeContainer}>
          <input
            type={showPasswordConfirm ? "" : "password"}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            onChange={handleConfirmPassword}
          />
          <FontAwesomeIcon
            onClick={() => {
              setShowPasswordConfirm(!showPasswordConfirm);
            }}
            icon={showPasswordConfirm ? faEye : faEyeSlash}
            size="lg"
            color="#6b7280"
            className={styles.icon}
          />
        </div>
        {!validConfirmPassword && confirmPassword.length > 0 && (
          <p className={styles.error}>
            {SIGN_UP_ERROR_MESSAGE.confirmPassword}
          </p>
        )}
      </div>

      <button
        disabled={!isActive}
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() => {
          handleSignUp({
            username,
            name,
            password,
            confirmPassword,
          });
        }}
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
