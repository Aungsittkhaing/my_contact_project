import React, { useEffect } from "react";
import { useProfileQuery } from "../../store/endpoint/auth.endpoint";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ check, children, token }) => {
  const nav = useNavigate();
  const { data, isError, isLoading } = useProfileQuery();
  console.log("auth", data, isError, isLoading);
  useEffect(() => {
    if (check) {
      localStorage.setItem("token", JSON.stringify(token));
    } else if (isError) {
      //   localStorage.removeItem("token");
      nav("/");
    } else if (data) {
      nav("/home");
    }
  }, [data, isError, check]);
  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};

export default AuthGuard;
