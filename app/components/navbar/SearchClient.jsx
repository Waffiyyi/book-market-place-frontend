"use client";
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
  Box,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {Person} from '@mui/icons-material';
import {pink} from '@mui/material/colors';
import {useSelector, useDispatch} from 'react-redux';
import {logoutAction} from "@/app/redux/slice/authSlice";
import {useRouter} from "next/navigation";
import {searchBooks} from "@/app/redux/slice/bookSlice";

export default function SearchClient() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jwt, setJwt] = useState(null);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
  const {books, isLoading} = useSelector((state) => state.book);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJwt(localStorage.getItem("jwt"));
      setMounted(true);
    }
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const res = await dispatch(searchBooks({query: searchQuery, jwt}));
      if (searchBooks.fulfilled.match(res)) {
        router.push("/book/search-result");
        handleSearchToggle();
      }
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/auth/login");
    handleMenuClose();
  };

  const handleAvatarClick = () => {
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <AppBar position='static' sx={{backgroundColor: 'black'}}>
      <Toolbar className='px-5 sticky top-0 z-50 py-[.8rem] lg:px-20 flex justify-between'>
        <div>
          <IconButton
            onClick={jwt ? () => router.push("/") : undefined} edge='start'
            className='text-white'
          >
            <AutoStoriesIcon />
          </IconButton>
        </div>
        <div className='flex items-center align-center'>
          {user && (
            <Box
              component='form'
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: searchOpen ? {xs: '100%', sm: 300, md: 400} : '40px',
                height: '40px',
                borderRadius: '999px',
                border: searchOpen ? '2px solid black' : 'none',
                paddingLeft: searchOpen ? '8px' : '0',
                transition: 'width 0.3s ease-in-out',
                overflow: 'hidden',
                backgroundColor: searchOpen ? 'black' : 'transparent',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              {searchOpen && (
                <InputBase
                  placeholder='Search by book title or author'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{flex: 1, paddingLeft: '10px', fontSize: '1rem'}}
                />
              )}

              <IconButton
                onClick={searchOpen ? handleSearch : handleSearchToggle}
                sx={{
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '4px',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          <div>
            {user && (
              <IconButton onClick={() => router.push("/cart")}>
                <Badge sx={{color: '#d511e8'}} badgeContent={cart?.items?.length}>
                  <ShoppingCartIcon sx={{fontSize: '1.5rem', color: '#ffffff'}} />
                </Badge>
              </IconButton>
            )}
          </div>

          <div className="cursor-pointer">
            {user ? (
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  bgcolor: "white",
                  color: pink.A400,
                }}
              >
                {user?.username[0].toUpperCase()}
              </Avatar>
            ) : (
              !jwt && (
                <IconButton onClick={() => router.push("/auth/login")}>
                  <Person />
                </IconButton>
              )
            )}
          </div>

          <IconButton
            edge='end'
            color='inherit'
            aria-controls='menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id='menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              sx: {backgroundColor: 'black', color: 'white'},
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link
                href={jwt ? "/" : "/auth/login"}
                style={{color: 'inherit', textDecoration: 'none'}}
              >
                {jwt ? 'Dashboard' : 'Login'}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                href='#contact'
                style={{color: 'inherit', textDecoration: 'none'}}
              >
                Contact Us
              </Link>
            </MenuItem>
            <MenuItem onClick={user ? handleLogout : handleMenuClose}>
              {user ? 'Logout' : (
                <Link
                  href='#about'
                  style={{color: 'inherit', textDecoration: 'none'}}
                >
                  About
                </Link>
              )}
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}