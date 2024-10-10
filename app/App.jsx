"use client";
import {useDispatch} from 'react-redux';
import {useRouter} from "next/navigation";
import {useEffect, useState} from 'react';
import {findUserCart} from "@/app/redux/slice/cartSlice";
import {getUser, checkTokenExpirationMiddleware} from "@/app/redux/slice/authSlice";

export default function App({children}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  let localJwt = null;
  if (typeof window !== 'undefined') {
    localJwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    dispatch(checkTokenExpirationMiddleware());
  }, [dispatch]);

  useEffect(() => {
    if (!localJwt) {
      router.push("/auth/login");
      setLoading(false);
    } else {
      dispatch(findUserCart(localJwt));
      dispatch(getUser(localJwt));
      setLoading(false);
    }
  }, [localJwt, dispatch, router]);

  // if (loading) {
  //   return <div >Loading...</div >;
  // }

  return <>{children}</>;
}