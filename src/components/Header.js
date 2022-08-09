import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import css from "./Header.module.scss";

function Header(props) {
  const { isLogin, setIsLogin } = props;
  const location = useLocation();
  const isTodo = location.pathname === "/todo";
  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <div className={css.container}>
      <div className={css.title}>{isTodo ? "투두 리스트" : "환영합니다!"}</div>
      {isTodo && (
        <button className={css.logout} onClick={logout}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default Header;
