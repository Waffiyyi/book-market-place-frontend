"use client";
import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Badge, InputBase, Paper, Menu, MenuItem} from "@mui/material";
import {AppBar, Toolbar, IconButton} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <AppBar position='static' className='bg-black'>
      <Toolbar className={'px-5 sticky top-0 z-50 py-[.8rem] lg:px-20 flex justify-between'}>
        <div >
          <IconButton edge='start' className='text-white'>
            <AutoStoriesIcon />
          </IconButton >
        </div >

        <div className={'flex items-center align-center'}>
          <Paper
            component='form'
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: searchOpen ? {xs: '100%', sm: 300, md: 400} : '40px',
              height: '40px',
              borderRadius: '999px',
              boxShadow: 'none',
              border: searchOpen ? '2px solid black' : 'none',
              paddingLeft: searchOpen ? '8px' : '0',
              transition: 'width 0.3s ease-in-out',
              overflow: 'hidden',
              backgroundColor: searchOpen ? "white" : "black",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            {searchOpen && (
              <InputBase
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  flex: 1,
                  paddingLeft: '10px',
                  fontSize: '1rem',
                }}
              />
            )}

            <IconButton
              onClick={handleSearchToggle}
              sx={{
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: '10px',
                marginRight: '4px',
                color: 'white',
                borderColor: "black",
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              <SearchIcon />
            </IconButton >
          </Paper >

          <IconButton >
            <Badge color='inherit'>
              <ShoppingCartIcon sx={{fontSize: '1.5rem', color: "#ffffff"}}/>
            </Badge >
          </IconButton >

          <span >Menu</span >
          <IconButton
            edge='end'
            color='inherit'
            aria-controls='menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
            sx={{marginLeft: '3px'}}
          >
            <MenuIcon />
          </IconButton >

          <Menu
            id='menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              sx: {
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{color: 'white'}}
            >
              Home
            </MenuItem >
            <MenuItem
              onClick={handleMenuClose}
              sx={{color: 'white'}}
            >
              Categories
            </MenuItem >
            <MenuItem
              onClick={handleMenuClose}
              sx={{color: 'white'}}
            >
              Contact Us
            </MenuItem >
          </Menu >
        </div >
      </Toolbar >
    </AppBar >
  );
}