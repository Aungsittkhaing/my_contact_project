import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
