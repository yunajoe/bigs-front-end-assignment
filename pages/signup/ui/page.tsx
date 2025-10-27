"use client";

import { signUpErrorMessage } from "@/shared/const/auth-validation";
import { SignUpParams } from "@/shared/types/auth";
import {
  checkConfirmationPasswordValidation,
  checkNameValidation,
  checkPasswordValidation,
  checkUserNameValidation,
} from "@/shared/utils/auth-validation";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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
    console.log("회원가입 버튼을 누릅니다.", data);

    const result = await signUp(data);
  };

  const isActive =
    validUserName && validName && validPassword && validConfirmPassword;

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}></div>
        <span className={styles.logoTitle}>BIGS PAYMENTS</span>
      </div>
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input placeholder="이메일을 입력해주세요" onChange={handleUserName} />
        {!validUserName && username.length > 0 && (
          <p className={styles.error}>{signUpErrorMessage.username}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label>닉네임</label>
        <input placeholder="닉네임을 입력해주세요" onChange={handleName} />
        {!validName && name.length > 0 && (
          <p className={styles.error}>{signUpErrorMessage.name}</p>
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
          <p className={styles.error}>{signUpErrorMessage.password}</p>
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
          <p className={styles.error}>{signUpErrorMessage.confirmPassword}</p>
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
