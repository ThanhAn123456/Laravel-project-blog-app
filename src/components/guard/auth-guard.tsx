import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "typescript-cookie";
import { removeUserInfo, saveUserInfo } from "store/slice/auth";
import { ChildrenType } from "types/componets";

const AuthGuardComponent: React.FC<ChildrenType> = ({ children }) => {
  const token = useSelector((state: any) => state?.auth?.access_token);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = getCookie("access_token") ? true : false;

  // Checking Authentication
  const checkAuth = () => {
    // Các đường dẫn không cần chuyển hướng về /auth/sign-in
    const allowedPaths = [
      "/auth/sign-up",
      "/auth/github/callback",
      "/auth/google/callback",
      "/auth/reset-password",
      "/auth/forgot-password",
    ];

    const isResetPasswordPath =
      location.pathname === "/auth/reset-password" &&
      new URLSearchParams(location.search).has("token") &&
      new URLSearchParams(location.search).has("email");

    if (!isAuth) {
      // Chỉ chuyển hướng nếu đường dẫn hiện tại không thuộc allowedPaths
      if (!allowedPaths.includes(location.pathname) && !isResetPasswordPath) {
        navigate("/auth/sign-in");
        dispatch(removeUserInfo());
      }
    } else {
      dispatch(saveUserInfo({ access_token: getCookie("access_token") }));
      // Nếu đã đăng nhập, ngăn người dùng quay lại các trang đăng nhập hoặc đăng ký
      if (
        location.pathname === "/auth/sign-in" ||
        location.pathname === "/auth/sign-up"
      ) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token, location.pathname]);

  return <div>{children}</div>;
};

export default AuthGuardComponent;
