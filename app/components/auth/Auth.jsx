"use client";
import React, {useState} from 'react';
import Signup from "@/app/components/auth/Signup";
import { usePathname } from 'next/navigation';
import Login from "@/app/components/auth/Login";

const Auth = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(pathname === '/');
  const toggleAuth = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      {isLogin ? (
        <Login />
      ) : (
        <Signup />
      )}
    </>
  );
};

export default Auth;