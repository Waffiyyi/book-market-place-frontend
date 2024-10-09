"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Book from '@/app/components/book/Book';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookList = ({ title, books, onBack }) => {
  const router = useRouter();

  return (
    <div className="bg-[#0D0D0D] min-h-screen px-5 py-10">
      <div className="flex gap-6 mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack || (() => router.back())}
          sx={{ color: '#fff', textTransform: 'none' }}
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
    </div>
  );
};

export default BookList;