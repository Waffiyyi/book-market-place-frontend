"use client"
import React, {useEffect, useState} from 'react';
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
  useEffect(()=>{
    dispatch(getFrequentlyBoughtWith(jwt))
  },[jwt, dispatch])
  return (
    <div className='grid grid-cols-6 gap-4'>
      {books.map((book)=>
        <Book
          key={book.id}
          id={book.id}
          image={book.image}
          genre={book.genre}
          title={book.title}
          author={book.author}
          price={book.price}
        />
      )}

    </div >
  );
};

export default FrequentlyBoughtBooks;