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

  console.log("isAuth: ", isAuth);

  // Checking Authentication
  const checkAuth = () => {
    if (!isAuth) {
      navigate("/auth/sign-in");
      dispatch(removeUserInfo());
    } else {
      dispatch(saveUserInfo({ token: getCookie("access_token") }));
      // Redirect Back Home is Auth Layout
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
  }, [token]);

  return <div>{children}</div>;
};

export default AuthGuardComponent;
