"use client";
import React from "react";
import Image from "next/image"; // Next.js optimized image component
import Button from "@mui/material/Button"; // MUI Button for actions
import Divider from "@mui/material/Divider"; // MUI Divider for separation

const ShoppingCart = ({ cartItem, recentlyViewed }) => {
  return (
    <div className="p-6 bg-black text-white max-w-5xl mx-auto rounded-lg shadow-lg">
      {/* Grid Layout for Shopping Cart and Recently Viewed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shopping Cart Section */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

          <div className="flex items-start space-x-4">
            {/* Book Image */}
            <Image
              src={cartItem.image}
              alt={cartItem.title}
              width={100}
              height={150}
              className="rounded-md"
            />

            {/* Book Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-400">
                {cartItem.title}
              </h3>
              <p className="text-gray-300">By {cartItem.author}</p>
              <p className="text-green-500 mt-1">In Stock</p>

              {/* Quantity Selector and Move to Favorites */}
              <div className="flex items-center space-x-2 mt-2">
                <label className="text-gray-300">Qty</label>
                <select className="bg-gray-800 text-white px-2 py-1 rounded-md">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <button className="text-blue-400 ml-4">Move to favorites</button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-xl font-bold">${cartItem.price}</p>
            </div>
          </div>

          {/* Divider */}
          <Divider className="bg-gray-700 my-6" />

          {/* Subtotal and Proceed to Checkout */}
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Subtotal</p>
            <p className="text-xl font-bold">${cartItem.price}</p>
          </div>

          <Button
            variant="contained"
            color="secondary"
            className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold"
          >
            Proceed to Checkout
          </Button>
        </div>

        {/* Recently Viewed Section */}
        <div className="col-span-1 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Recently Viewed By You</h2>
          <div className="flex items-start space-x-4">
            {/* Recently Viewed Book Image */}
            <Image
              src={recentlyViewed.image}
              alt={recentlyViewed.title}
              width={80}
              height={120}
              className="rounded-md"
            />

            {/* Recently Viewed Info */}
            <div>
              <span className="text-sm text-gray-400 block mb-1">
                {recentlyViewed.genre}
              </span>
              <h3 className="text-md font-bold text-gray-300">
                {recentlyViewed.title}
              </h3>
              <p className="text-gray-500">By {recentlyViewed.author}</p>
              <p className="text-yellow-400">★★★★★</p>
              <p className="text-lg font-bold mt-1">${recentlyViewed.price}</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="secondary"
            className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;