"use client";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedCategories} from "@/app/redux/slice/bookSlice";
import CategoryList from "@/app/components/category/CategoryList";
import {categoryProperties} from "@/app/components/category/availableCategoryListProps";
import {CircularProgress} from "@mui/material";

const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const {categories, isLoading} = useSelector((state) => state.book);

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
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress color="primary"/>
          <p className="text-white ml-2">Loading featured categories...</p >
        </div >
      ) : (
        <CategoryList categories={categories.slice(0,15)}/>
      )}
    </div >
  );
};
export default FeaturedCategories;