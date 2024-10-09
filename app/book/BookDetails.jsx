"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CartModal from "@/app/components/modal/CartModal";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {fetchBook} from "@/app/redux/slice/bookSlice";

const BookDetail = ({params}) => {
  const dispatch = useDispatch();
  const {isLoading, book} = useSelector((state) => state.book);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    dispatch(fetchBook({bookId: params.id, jwt}));
  }, [dispatch, jwt, params.id]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = () => {
    setModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div
      className="bg-[#0D0D0D] p-6 text-white max-w-4xl mx-auto rounded-md shadow-lg space-y-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-80">
          <Image
            src={book.image}
            alt={book.title}
            width={100}
            height={100}
            className="rounded-md w-full h-auto object-cover"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <p className="text-sm mb-1">Author</p>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <p className="text-sm mb-1">Date Released</p>
          <p className="text-sm text-gray-600 mb-2">{book.releaseDate}</p>
          <p className="text-sm mb-1">Category</p>
          <p className="text-sm text-gray-600 mb-2">{book.genre}</p>
          <p className="text-sm mb-1">Ratings</p>
          <div className="mb-2">
            <Rating
              name="read-only"
              value={book.rating}
              readOnly
              precision={0.5}
              size="small"
              sx={{color: '#d511e8'}}
            />
          </div>
        </div>
        <div>
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold mb-2" style={{color: "white"}}>
              {book.title}
            </h3>
            <p className="text-sm mb-2">{book.description}</p>
            <p className="text-sm font-bold mb-2 text-[#d511e8]">${book.price}</p>
            <Button
              variant="contained"
              sx={{bgcolor: '#0D0D0D', color: "white", border: "1px solid white"}}
              className="mt-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <CartModal
        open={modalOpen} onClose={handleCloseModal} book={book} subtotal={book.price}
      />
    </div>
  );
};

export default BookDetail;