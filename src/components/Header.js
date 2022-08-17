import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./Header.module.scss";

function Header() {
  const location = useLocation();
  const isTodo = location.pathname === "/todo";

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

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
