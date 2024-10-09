import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { fetchBook } from "@/app/redux/slice/bookSlice";
import {addItemToCart} from "@/app/redux/slice/cartSlice";

const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const [prevBookId, setPrevBookId] = useState(null);
  const { book } = useSelector((state) => state.book);
  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    const recentBookIds = JSON.parse(localStorage.getItem('recentlyViewedBooks')) || [];
    if (recentBookIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * recentBookIds.length);
      const randomBookId = recentBookIds[randomIndex];
        dispatch(fetchBook({bookId: randomBookId, jwt}));
        setPrevBookId(randomBookId);
    }
  }, [dispatch, prevBookId]);
  const handleAddToCart= ()=> {
    const reqData = {
      bookId:book.id,
      quantity: 1,
      jwt
    }
    dispatch(addItemToCart({reqData}));
  }

  return (
    <div className='bg-gray-800 rounded-lg p-2 h-62' style={{ borderRadius: '20px' }}>
      <h2 className='text-lg font-bold mb-0'>Recently Viewed By You</h2>
      {book && (
        <div className='flex items-start space-x-2'>
          <div>
            <Image
              src={book?.image}
              alt={book?.title}
              width={100}
              height={100}
              className='h-52'
              unoptimized={true}
            />
          </div>

          <div className=''>
            <span className='text-sm text-gray-400 block mb-0'>{book?.genre}</span>
            <h3 className='text-md font-bold text-gray-300'>{book?.title}</h3>
            <p className='text-gray-500'>By {book?.author}</p>
            <Rating
              name='read-only'
              value={book?.rating}
              readOnly
              precision={0.5}
              size='small'
              sx={{ color: '#d511e8' }}
            />
            <p className='text-xs font-bold mt-0'>${book?.price}</p>
            <Button
              variant='contained'
              sx={{ color: 'white', bgcolor: '#d511e8', height: '30px' }}
              className='mt-2 font-bold'
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;