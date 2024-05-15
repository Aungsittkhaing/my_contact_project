import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
  return (
    <div className="w-full h-20 px-52 flex items-center border-b bg-white">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-xl font-semibold">My Contact App</h1>
        <div>
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
