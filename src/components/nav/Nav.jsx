import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/endpoint/auth.endpoint";
const Nav = () => {
  const nav = useNavigate();
  const [logoutFun] = useLogoutMutation();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    await logoutFun();
    nav("/");
  };
  return (
    <div className="w-full h-20 px-52 flex items-center border-b bg-white">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-xl font-semibold">My Contact App</h1>
        <div className="flex justify-center items-center gap-5">
          <button
            className="bg-red-400 px-2 py-2 rounded text-white active:ring-2 active:ring-red-500 duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Nav;
