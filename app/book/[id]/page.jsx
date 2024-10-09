import React from 'react';
import BookDetails from "@/app/book/BookDetails";
import Section from "@/app/components/section/Section";
import Featured from "@/app/components/book/Featured"

const Page = () => {
  return (
    <div className={'min-h-screen px-8'}>
    <BookDetails />
    <Section title='You may also like' link='/book/best-selling'>
        <Featured/>
    </Section >
  </div >);
};

export default Page;