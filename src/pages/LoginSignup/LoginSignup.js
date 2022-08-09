import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePwInput = (e) => {
    setPassword(e.target.value);
  };

  const [isValidEmail, setIsValidEmail] = useState(false);
  const emailValidation = () => {
    if (email.includes("@")) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const [isValidPw, setIsValidPw] = useState(false);
  const pwValidation = () => {
    if (password.length >= 8) setIsValidPw(true);
    else {
      setIsValidPw(false);
    }
  };

  const [loginValid, setLoginValid] = useState(false);
  const loginValidaion = () => {
    if (isValidEmail && isValidPw) {
      setLoginValid(true);
    } else {
      setLoginValid(false);
    }
  };

  useEffect(() => {
    emailValidation();
    pwValidation();
    loginValidaion();
  });

  const login = (e) => {
    e.preventDefault();
    fetch(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          localStorage.setItem("token", res.access_token);
          navigate("/todo");
        } else {
          alert("회원 정보를 확인해주세요.");
        }
      });
  };

  const signup = (e) => {
    e.preventDefault();
    fetch(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token) {
          alert("회원가입 성공!");
        } else {
          alert("회원가입 실패!");
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/todo");
    }
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          value={email}
          onChange={handleEmailInput}
          name="email"
          placeholder="이메일을 입력해주세요."
        />
        <label htmlFor="password">패스워드</label>
        <input
          value={password}
          onChange={handlePwInput}
          name="password"
          placeholder="이메일을 입력해주세요."
          type="password"
        />
        <button disabled={!loginValid} onClick={login}>
          로그인
        </button>
        <button disabled={!loginValid} onClick={signup}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default LoginSignup;