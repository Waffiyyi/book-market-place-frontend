import React from 'react';
import Image from "next/image";
const cartItem = {
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxJOXvqnX1pHMd-fmJCfftyxVXHpoc6T4HBiLeRgcUr5B-b64tRG5VhMiIQJgWIcTaPE&usqp=CAU",
  title: "The React Handbook",
  author: "Flavio Copes",
  price: 29.99,
};
const CartItem = () => {
  return (
    <div className='flex items-start space-x-4 mb-5'>
      <Image
        src={cartItem.image}
        alt={cartItem.title}
        width={100}
        height={150}
        className='rounded-md'
        unoptimized={true}
      />

      <div className='flex-1'>
        <h3 className='text-xl font-bold text-purple-400'>{cartItem.title}</h3>
        <p className='text-gray-300'>By {cartItem.author}</p>
        <p className='text-green-500 mt-1'>In Stock</p>

        <div className='flex items-center space-x-2 mt-2'>
          <label className='text-gray-300'>Qty</label>
          <select className='bg-gray-800 text-white px-2 py-1 rounded-md'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button className='text-blue-400 ml-4'>Move to favorites</button>
        </div>
      </div>

      <div className='text-right'>
        <p className='text-xl font-bold'>${cartItem.price}</p>
      </div>
    </div>
  );
};

export default CartItem;