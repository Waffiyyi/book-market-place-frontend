"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import CartItem from "@/app/components/cart/CartItem";
import RecentlyViewed from "@/app/components/cart/RecentlyViewed";
import {
  checkoutCart,
  updateCartItem
} from "@/app/redux/slice/cartSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cart, cartItems, loading } = useSelector((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const updateCartItems = (id, bookId, quantity) => {
    return new Promise((resolve) => {
      const reqData = {
        cartItemId: id,
        bookId,
        quantity,
        jwt,
      };
      dispatch(updateCartItem(reqData)).then(resolve);
    });
  };

  const handleCheckout = () => {
    const reqData = {
      cartDTO:{
      id:cart.id,
        userId:cart.userId,
        total:cart.total,
        items:cart.items

      }, dispatch, jwt };
    dispatch(checkoutCart(reqData));
  };

  return (
    <div className="bg-black text-white max-w-5xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-2/3 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
            <p className="text-lg sm:text-xl font-semibold mr-3 sm:mr-5">Price</p>
          </div>

          {cartItems.map((item, index) => (
            <CartItem key={`${item.id}-${index}`} cartItem={item} updateCartItems={updateCartItems} />
          ))}

          <Divider sx={{ bgcolor: "white", height: "1px", margin: "20px 0" }} />

          <div className="flex justify-end items-center gap-3 mt-1 mr-3 sm:mr-5 mb-5">
            <p className="text-sm sm:text-base font-light">Subtotal</p>
            <p className="text-base sm:text-lg font-bold">${cart?.total}</p>
          </div>

          <Button
            variant="contained"
            onClick={handleCheckout}
            disabled={loading}
            sx={{
              color: "white",
              bgcolor: "#d511e8",
              height: "40px",
              width: { xs: "100%", sm: "100%", md: "600px" },
            }}
            className="py-2 text-normal font-bold"
          >
            Proceed to Checkout
          </Button>
        </div>

        <Divider sx={{ bgcolor: "white", width: "1px" }} orientation="vertical" flexItem className="hidden lg:block" />

        <div className="w-full lg:w-1/3 pl-0 lg:pl-6 mt-8 lg:mt-0">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;