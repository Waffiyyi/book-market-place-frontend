"use client";
import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "@/app/cart/CartItem";
const cartItem = {
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxJOXvqnX1pHMd-fmJCfftyxVXHpoc6T4HBiLeRgcUr5B-b64tRG5VhMiIQJgWIcTaPE&usqp=CAU",
  title: "The React Handbook",
  author: "Flavio Copes",
  price: 29.99,
};
const recentlyViewed = {
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxJOXvqnX1pHMd-fmJCfftyxVXHpoc6T4HBiLeRgcUr5B-b64tRG5VhMiIQJgWIcTaPE&usqp=CAU",
  title: "JavaScript: The Good Parts",
  author: "Douglas Crockford",
  price: 19.99,
  genre: "Programming",
  rating: 3.5,
};
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }


  return (
    <div className='p-6 bg-black text-white max-w-5xl mx-auto rounded-lg shadow-lg'>
      <div className='flex justify-between'>
        <div>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>
            <p className='text-xl mr-5'>Price</p>
          </div>

         <CartItem/>

          <Divider sx={{ bgcolor: "white", height: "1px", margin: "0" }} />

          <div className='flex justify-end align-middle gap-4 items-center mt-5'>
            <p className='text-sm'>Subtotal</p>
            <p className='text-normal font-bold'>${cartItem.price}</p>
          </div>

          <Button
            variant='contained'
            sx={{ color: 'white', bgcolor: '#d511e8' }}
            className='mt-4 w-full font-bold'
          >
            Proceed to Checkout
          </Button>
        </div>

        <Divider sx={{ bgcolor: "white", width: "0.5px" }} orientation='vertical' flexItem />

        <div className='bg-gray-800 rounded-lg p-2 h-52' style={{ borderRadius: '20px' }}>
          <h2 className='text-lg font-bold mb-0'>Recently Viewed By You</h2>
          <div className='flex items-start space-x-2'>
            <div>
              <Image
                src={recentlyViewed.image}
                alt={recentlyViewed.title}
                width={100}
                height={120}
                className='rounded-md h-42'
                unoptimized={true}
              />
            </div>

            <div className=''>
              <span className='text-sm text-gray-400 block mb-1'>{recentlyViewed.genre}</span>
              <h3 className='text-md font-bold text-gray-300'>{recentlyViewed.title}</h3>
              <p className='text-gray-500'>By {recentlyViewed.author}</p>
              <Rating
                name='read-only'
                value={recentlyViewed.rating}
                readOnly
                precision={0.5}
                size='small'
                sx={{ color: '#d511e8' }}
              />
              <p className='text-xs font-bold mt-0'>${recentlyViewed.price}</p>
              <Button
                variant='contained'
                sx={{ color: 'white', bgcolor: '#d511e8', height:'30px' }}
                className='mt-2 font-bold'
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;