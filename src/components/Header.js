import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    <div>
      <div>{isTodo ? "투두 리스트" : "환영합니다!"}</div>
      {isTodo && <button onClick={logout}>로그아웃</button>}
    </div>
  );
}

export default Header;
