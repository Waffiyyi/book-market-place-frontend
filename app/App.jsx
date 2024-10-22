"use client";
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from "next/navigation";
import {useEffect, useState} from 'react';
import {findUserCart} from "@/app/redux/slice/cartSlice";
import {getUser, checkTokenExpirationMiddleware} from "@/app/redux/slice/authSlice";

export default function App({children}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {jwt} = useSelector((state) => state.auth);

  let localJwt = null;
  if (typeof window !== 'undefined') {
    localJwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    dispatch(checkTokenExpirationMiddleware());
  }, [dispatch]);

  useEffect(() => {
    if (!jwt || !localJwt) {
      router.push("/auth/login");
    } else {
      dispatch(findUserCart(localJwt));
      dispatch(getUser(localJwt));
    }
  }, [localJwt, dispatch, router, jwt]);

  return <>{children}</>;
}