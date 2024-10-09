"use client";
import React from 'react';
import {Button, Card} from "@mui/material";
import {green} from "@mui/material/colors";
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import {useRouter} from 'next/navigation';

const Success = () => {
  const router = useRouter();
  return (
    <div className={'min-h-screen px-5 '}>
      <div className={'flex flex-col items-center justify-center h-[80vh]'}>
        <Card className={'box w-50% lg:w-1/4 flex flex-col items-center rounded-md p-5' +
            ' bg-gray-900'}>
          <TaskAltIcon sx={{fontSize: "3rem", color: green[500]}}/>
          <h1>Order Success!</h1>
          <p className={'py-3 text-center text-gray-400'}>Thank you
                                                          for choosing BookMarketPlace! We appreciate your
                                                          Order </p>
          <p className={'py-2 text-center text-gray-200 text-lg'}>Have
                                                                  A Great Day!</p>
          <Button onClick={() => router.push("/")}
                  variant={'contained'}
                  className={'py-5'}
                  sx={{margin: "1rem 0rem", height:"20px"}}>Return to home</Button>
        </Card>
      </div>
    </div>
  );
};

export default Success;