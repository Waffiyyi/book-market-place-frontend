"use client";
import React from 'react';
import { genreColor } from "@/app/category";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getGenreColor = (genreName) => {
  const genre = genreColor.find((g) => g.name === genreName);
  return genre ? genre.color : "white";
};

const Book = ({ id, image, title, author, price, genre }) => {
  const router = useRouter();
  const genreTextColor = getGenreColor(genre);

  const handleBookClick = () => {
    router.push(`/book/${id}`);
  };

  return (
    <div
      className="bg-black w-full h-auto max-w-[160px] text-white cursor-pointer"
      onClick={handleBookClick}
    >
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        className="w-full h-auto object-contain rounded-md mb-1"
        quality={100}
      />
      <span className="text-xs block mb-0 px-1" style={{ color: genreTextColor }}>
        {genre}
      </span>
      <h3 className="text-sm font-bold px-1 mb-1" style={{ color: genreTextColor }}>{title}</h3>
      <p className="text-xs text-gray-300 px-1">{author}</p>
      <p className="text-sm font-bold mt-2 mb-2 px-1">${price}</p>
    </div>
  );
};

export default Book;