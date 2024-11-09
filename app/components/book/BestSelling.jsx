'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBestSellingBooks } from "@/app/redux/slice/bookSlice";
import Book from "@/app/components/book/Book";
import { CircularProgress } from '@mui/material';

const BestSelling = () => {
  const dispatch = useDispatch();
  const { bestSellingBooks, isLoading } = useSelector((state) => state.book);
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getBestSellingBooks(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress color="primary" />
          <p className="text-white ml-2">Loading best-selling books...</p>
        </div>
      ) : (
        bestSellingBooks.slice(0, 6).map((book) => (
          <Book
            key={book.id}
            id={book.id}
            image={book.image}
            genre={book.genre}
            title={book.title}
            author={book.author}
            price={book.price}
          />
        ))
      )}
    </div>
  );
};

export default BestSelling;