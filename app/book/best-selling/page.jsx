"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestSellingBooks } from '@/app/redux/slice/bookSlice';
import BookList from '@/app/components/book/BookList';

const BestSellingBooksPage = () => {
  const dispatch = useDispatch();
  const { bestSellingBooks } = useSelector((state) => state.book);

  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem('jwt');
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getBestSellingBooks(jwt));
    }
  }, [dispatch, jwt]);

  return <BookList title="Best Selling Books" books={bestSellingBooks} />;
};

export default BestSellingBooksPage;