"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getFeaturedBooks, getFeaturedCategories} from "@/app/redux/slice/bookSlice";
import Category from "@/app/components/category/Category";
import {categoryProperties} from "@/app/components/category/availableCategoryListProps";


const FeaturedCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.book);
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getFeaturedCategories(jwt));
    }
  }, [dispatch, jwt]);

  const displayedCategories = categories.slice(0, 4);


  return (
    <>
      {displayedCategories.map((category) => {
        const { icon, color, glowColor } = categoryProperties[category] || {
          icon: '📚',
          color: '#9e9e9e',
          glowColor: '#e0e0e0', };
        return (
          <Category
            key={category}
            title={category}
            icon={icon}
            color={color}
            glowColor={glowColor}
          />
        );
      })}
    </>
  );
};

export default FeaturedCategory;