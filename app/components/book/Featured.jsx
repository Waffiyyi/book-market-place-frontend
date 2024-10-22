"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedBooks } from "@/app/redux/slice/bookSlice";
import Book from "@/app/components/book/Book";
import { CircularProgress } from '@mui/material';

const Featured = () => {
  const dispatch = useDispatch();
  const { featuredBooks, isLoading } = useSelector((state) => state.book);
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getFeaturedBooks(jwt));
    }
  }, [dispatch, jwt]);

  const displayedBooks = featuredBooks.slice(0, 6);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress color="primary" />
          <p className="text-white ml-2">Loading featured books...</p>
        </div>
      ) : (
        displayedBooks.map((book) => (
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

export default Featured;