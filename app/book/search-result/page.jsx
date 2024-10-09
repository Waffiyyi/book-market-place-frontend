"use client";
import React, { useEffect } from 'react';
import BookList from "@/app/components/book/BookList";
import { useDispatch, useSelector } from "react-redux";
import {useRouter} from "next/navigation"

const SearchResult = () => {
  const router = useRouter()
  const { books } = useSelector((state) => state.book);
  return books && books.length ? (
    <BookList title="These Matched Your Search" books={books} onBack={()=>router.push("/")} />
  ) : (
    <p>No books matched your search</p>
  );
};

export default SearchResult;