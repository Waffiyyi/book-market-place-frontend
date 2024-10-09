"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import {findUserCart, logout} from "@/app/redux/slice/cartSlice";
import {bookLogoutAction} from "@/app/redux/slice/bookSlice";
import {getUser} from "@/app/redux/slice/authSlice";

export default function AuthWrapper({ children }) {
  const {jwt, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  let localJwt = null;
  if (typeof window !== 'undefined') {
    localJwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt === null && localJwt === null) {
      // dispatch(logout)
      // dispatch(bookLogoutAction)
      router.push("/auth/login");
    }
  }, [router, jwt, localJwt]);

  useEffect(() => {
    if (jwt || localJwt) {
      dispatch(findUserCart(localJwt));
      dispatch(getUser(localJwt));
    }
  }, [localJwt, dispatch, jwt]);

  return <>{children}</>;
}