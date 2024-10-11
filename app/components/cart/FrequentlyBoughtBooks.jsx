"use client";
import React, {useEffect} from 'react';
import Book from "@/app/components/book/Book";
import {useDispatch, useSelector} from "react-redux";
import {getFrequentlyBoughtWith} from "@/app/redux/slice/bookSlice";

const FrequentlyBoughtBooks = () => {
  const dispatch = useDispatch();
  const {books} = useSelector((state) => state.book);
  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getFrequentlyBoughtWith(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div>
      {books.length === 0 ? (
        <p className={'text-gray-400'}>You have not purchased a book from any author.</p>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-2  gap-3'>
          {books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              image={book.image}
              genre={book.genre}
              title={book.title}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FrequentlyBoughtBooks;