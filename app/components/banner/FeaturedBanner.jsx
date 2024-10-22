"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedBooks } from "@/app/redux/slice/bookSlice";

const FeaturedBanner = () => {
  const dispatch = useDispatch();
  const { featuredBooks } = useSelector((state) => state.book);

  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getFeaturedBooks(jwt));
    }
  }, [dispatch, jwt]);

  const [initialBooks, setInitialBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottomBook, setBottomBook] = useState(null);

  useEffect(() => {
    if (featuredBooks.length > 0) {
      const initial = featuredBooks.slice(0, 10);
      setInitialBooks(initial);
      setBottomBook(initial[0]);
    }
  }, [featuredBooks]);

  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialBooks.length);
  };

  useEffect(() => {
    if (initialBooks.length > 0) {
      const interval = setInterval(() => {
        nextBook();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [initialBooks]);

  useEffect(() => {
    if (initialBooks.length > 0) {
      setBottomBook(initialBooks[currentIndex]);
    }
  }, [currentIndex, initialBooks]);

  return (
    <div className="relative bg-cover bg-center h-[500px] w-full" style={{ backgroundImage: 'url(https://res.cloudinary.com/dpbz4y0q8/image/upload/v1728200349/j7k7ifzderyvepstslen.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"></div>

      {initialBooks.length > 0 && (
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl flex justify-center">
          <div className="relative flex justify-center">
            <div className="relative w-[200px] h-[300px]">
              <img
                src={initialBooks[(currentIndex + 1) % initialBooks.length]?.image}
                alt={initialBooks[(currentIndex + 1) % initialBooks.length]?.title}
                width={200}
                height={100}
                className="rounded-md transform transition duration-300 ease-in-out"
                style={{ zIndex: 2, transform: 'rotate(-10deg)' }}
                quality={100}
              />
              <Image
                src={initialBooks[(currentIndex + 2) % initialBooks.length]?.image}
                alt={initialBooks[(currentIndex + 2) % initialBooks.length]?.title}
                width={200}
                height={100}
                className="absolute top-2 left-[-30px] rounded-md transform transition duration-300 ease-in-out"
                style={{ zIndex: 1, transform: 'rotate(-20deg)' }}
                quality={100}
              />
              <Image
                src={bottomBook?.image}
                alt={bottomBook?.title}
                width={200}
                height={100}
                className="absolute top-4 left-[-60px] rounded-md transform transition duration-300 ease-in-out"
                style={{ zIndex: 3, transform: 'rotate(0deg)' }}
                quality={100}
              />
            </div>
          </div>

          <div className="bg-black bg-opacity-70 p-2 rounded-md text-white text-center absolute bottom-[-50px] w-full max-w-sm z-10">
            <h2 className="text-lg font-bold">{bottomBook?.title}</h2>
            <p>{bottomBook?.author} - {bottomBook?.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedBanner;