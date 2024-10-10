"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CartModal from "@/app/components/modal/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'next/navigation';
import { fetchBook } from "@/app/redux/slice/bookSlice";
import { addItemToCart } from "@/app/redux/slice/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const BookDetail = () => {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  const { loading, cart } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = params;
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJwt(localStorage.getItem("jwt"));
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (id && jwt) {
      dispatch(fetchBook({ bookId: id, jwt }));
      const recentBooks = JSON.parse(localStorage.getItem("recentlyViewedBooks")) || [];
      const updatedBooks = recentBooks.filter(bookId => bookId !== id);
      updatedBooks.unshift(id);
      localStorage.setItem("recentlyViewedBooks", JSON.stringify(updatedBooks.slice(0, 5)));
    }
  }, [dispatch, id, jwt]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = async () => {
    const reqData = {
      bookId: book.id,
      quantity: 1,
      jwt
    };
    try {
      const actionResult = await dispatch(addItemToCart({ reqData}));
      const result = unwrapResult(actionResult);
      console.log("result", result);
      setModalOpen(true);
    } catch (error) {
      console.log("Failed to add to cart:", error);
    }
  };
  if (!mounted) return null;
  return (
    <div
      className="bg-[#0D0D0D] p-6 text-white max-w-4xl mx-auto rounded-md shadow-lg space-y-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-80">
          <Image
            src={book?.image}
            alt={book?.title}
            width={100}
            height={100}
            className="rounded-md w-full h-auto object-cover"
            quality={100}
          />
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <p className="text-sm mb-1">Author</p>
          <p className="text-sm text-gray-600 mb-2">{book?.author}</p>
          <p className="text-sm mb-1">Date Released</p>
          <p className="text-sm text-gray-600 mb-2">
            {book?.dateReleased ? new Date(book.dateReleased).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }) : 'N/A'}
          </p>
          <p className="text-sm mb-1">Category</p>
          <p className="text-sm text-gray-600 mb-2 gap-2">
            {book?.categories?.join('  ')}
          </p>
          <p className="text-sm mb-1">Ratings</p>
          <div className="mb-2">
            <Rating
              name="read-only"
              value={book?.rating || 0}
              readOnly
              precision={0.5}
              size="small"
              sx={{ color: '#d511e8' }}
            />
          </div>
        </div>
        <div>
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2" style={{ color: "white" }}>
              {book?.title}
            </h3>
            <p className="text-sm mb-2">{book?.description}</p>
            <p className="text-sm font-bold mb-2 text-[#d511e8]">${book?.price}</p>
            <Button
              variant="contained"
              sx={{ bgcolor: '#0D0D0D', color: "white", border: "1px solid white" }}
              className="mt-1"
              onClick={handleAddToCart}
              disabled={loading}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <CartModal
        open={modalOpen} onClose={handleCloseModal} book={book} subtotal={cart?.total}
      />
    </div>
  );
};

export default BookDetail;