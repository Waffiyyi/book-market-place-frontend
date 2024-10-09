"use client";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedCategories} from "@/app/redux/slice/bookSlice";
import CategoryList from "@/app/components/category/CategoryList";
import {categoryProperties} from "@/app/components/category/availableCategoryListProps";

const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.book);

  console.log("categories", categories)
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getFeaturedCategories(jwt));
    }
  }, [dispatch, jwt]);
  return (
    <div >
      <CategoryList categories={categories}/>
    </div >
  );
};

export default FeaturedCategories;