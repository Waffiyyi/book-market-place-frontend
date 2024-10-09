'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBestSellingBooks } from "@/app/redux/slice/bookSlice";
import Book from "@/app/components/book/Book";

const BestSelling = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);

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
    <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3'>
      {books.slice(0, 6).map((book) => (
        <Book
          key={book.id}
          image={book.image}
          genre={book.genre}
          title={book.tittle}
          author={book.author}
          price={book.price}
        />
      ))}
    </div>
  );
};

export default BestSelling;