"use client";
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from "next/navigation";
const Section = ({ title, children, link }) => {
  const router = useRouter();
  return (
    <div className="my-5 p-5 width-[75%]">
      <hr className="border-t border-gray-600 my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {link && (
          <div className={'flex items-center gap-2'}>
            <span className={'text-sm'}>See all</span>
            <ArrowForwardIcon onClick={()=>router.push(link)} sx={{cursor:"pointer"}}/>
          </div>
        )}
      </div>
      <hr className="border-t border-gray-600 my-4" />
      <div className="grid gap-4">{children}</div>
    </div>
  );
};

export default Section;