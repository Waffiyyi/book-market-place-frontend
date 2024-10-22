"use client";

import FeaturedBanner from "@/app/components/banner/FeaturedBanner";
import Section from "@/app/components/section/Section";
import Category from "@/app/components/category/Category";
import Newsletter from "@/app/components/newsletter/Newsletter";
import BestSelling from "@/app/components/book/BestSelling";
import Featured from "@/app/components/book/Featured";
import FeaturedCategory from "@/app/components/category/FeaturedCategory";


const Home = () => {

  return (
    <div className='bg-[#0D0D0D] min-h-screen'>
      <FeaturedBanner />
      <div className='px-5 mb-20'>
        <Section title='Featured Categories' link='/featured-category'>
          <div
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 content-around px-5'
          >
            <FeaturedCategory/>
          </div >
        </Section >
        <Section title='Bestselling Books' link='/book/best-selling'>
          <BestSelling />
        </Section >
        <Section title='Featured Books'>
          <Featured />
        </Section >
      </div >
      <Newsletter />
    </div >

  );
};

export default Home;