import React, { useState, useEffect } from "react";
import Image from "next/image";

const CartItem = ({ cartItem }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !cartItem) return null;

  return (
    <div className="flex items-start mb-8">
      <Image
        src={cartItem.book?.image}
        alt={cartItem.book?.title}
        width={80}
        height={120}
        className="rounded-md"
        unoptimized
      />

      <div className="ml-4 flex-1">
        <h3 className="text-lg font-bold text-purple-400">{cartItem.book?.title}</h3>
        <p className="text-gray-300">By {cartItem.book?.author}</p>
        <p className="text-green-400 mt-2">In Stock</p>

        <div className="flex items-center mt-3 space-x-3">
          <label className="text-gray-400">Qty</label>
          <select className="bg-gray-800 text-white px-3 py-1 rounded">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button className="text-blue-400">Move to favorites</button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold mr-5">${cartItem.book?.price}</p>
      </div>
    </div>
  );
};

export default CartItem;