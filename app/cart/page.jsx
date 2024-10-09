import React from 'react';
import Book from "@/app/components/book/Book";
import Section from "@/app/components/section/Section";
import ShoppingCart from "@/app/components/cart/ShoppingCart";
import FrequentlyBoughtBooks from "@/app/components/cart/FrequentlyBoughtBooks";

const CartPage = () => {
  return (
    <div className={'p-5'}>
      <ShoppingCart />
      <Section title='Frequently Bought With'>
        <FrequentlyBoughtBooks/>
      </Section >
    </div >
  );
};

export default CartPage;