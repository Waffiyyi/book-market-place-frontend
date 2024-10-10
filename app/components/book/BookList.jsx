"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Book from '@/app/components/book/Book';
import {
  Button,
  IconButton,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import { filterBooks, getAllCategories } from "@/app/redux/slice/bookSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BookList = ({ title, books, onBack }) => {
  const router = useRouter();
  const { categories, isLoading } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  let jwt = null;
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }

  useEffect(() => {
    dispatch(getAllCategories(jwt));
  }, [jwt, dispatch]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(filterBooks(category, jwt));
    setAnchorEl(null);
  };

  const handleIconClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen px-5 py-10">
      <div className="flex items-center gap-6 mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack || (() => router.back())}
          sx={{ color: '#fff', textTransform: 'none' }}
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white">{title}</h1>

        <div className="ml-auto">
          <IconButton
            onClick={handleIconClick}
            sx={{ color: '#fff' }}
          >
            <FilterListIcon />
          </IconButton>

          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper>
                <MenuList sx={{ maxHeight: 400, overflowY: 'auto',  bgcolor:"transparent" }}>
                  <MenuItem onClick={() => handleCategoryChange('')}>
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} onClick={() => handleCategoryChange(category)}>
                      {category}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <CircularProgress color="primary" />
            <p className="text-white">Loading books...</p>
          </div>
        ) : (
          books
          .map((book) => (
            <Book
              key={book.id}
              id={book.id}
              image={book.image}
              genre={book.genre}
              title={book.title}
              author={book.author}
              price={book.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;