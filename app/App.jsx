"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import {findUserCart, logout} from "@/app/redux/slice/cartSlice";
import {bookLogoutAction} from "@/app/redux/slice/bookSlice";
import {checkTokenExpirationMiddleware, getUser} from "@/app/redux/slice/authSlice";

export default function App({ children }) {
  const {jwt, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(checkTokenExpirationMiddleware());
  }, [dispatch]);

  let localJwt = null;
  if (typeof window !== 'undefined') {
    localJwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt === null && localJwt === null) {
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