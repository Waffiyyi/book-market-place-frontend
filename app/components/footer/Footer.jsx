import {IconButton} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import React from "react";
import Image from "next/image";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-gray-950 text-white py-8 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
          <div className='mb-4 md:mb-0 text-center md:text-left'>
            <IconButton sx={{cursor:"default"}} edge='start' className='text-white'>
              <AutoStoriesIcon fontSize="large" sx={{marginBottom:"13px", cursor:"default"}}/>
            </IconButton >
            <div className='flex justify-center md:justify-start mb-4 space-x-4'>

                <XIcon sx={{cursor:"pointer"}}/>

                <InstagramIcon sx={{cursor:"pointer"}}/>
               <LinkedInIcon sx={{cursor:"pointer"}}/>
                <FacebookIcon sx={{cursor:"pointer"}}/>
            </div >
            <div className='text-gray-400'>
              <p className='hover:text-white cursor-pointer mb-1'>Privacy
                                                                  policy</p >
              <p className='hover:text-white cursor-pointer'>Terms and
                                                             Conditions</p >
            </div >
          </div >

          <div className='flex flex-wrap justify-center md:justify-start space-x-8'>
            <div >
              <h6 className='font-semibold mb-2'>Home</h6 >
              <p id={"about"} className='hover:text-gray-400 cursor-pointer mb-2'>About</p >
              <p className='hover:text-gray-400 cursor-pointer'>Category</p >
            </div >
            <div >
              <h6 className='font-semibold mb-2'>Health</h6 >
              <p className='hover:text-gray-400 cursor-pointer mb-2'>Lifestyle</p >
              <p className='hover:text-gray-400 cursor-pointer'>Business</p >
            </div >
            <div >
              <h6 id={"contact"} className='font-semibold mb-2'>Contact Us</h6 >
              <Link href={'#login'} className='hover:text-gray-400 cursor-pointer mb-2'>Subscribe</Link >
            </div >
          </div >
        </div >
      </div >
    </footer >
);
}