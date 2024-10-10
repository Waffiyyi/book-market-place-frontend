"use client";
import React from 'react';
import {Button, Card} from "@mui/material";
import {red} from "@mui/material/colors";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {useRouter} from 'next/navigation';

const Fail = () => {
  const router = useRouter();
  return (
    <div className={'min-h-screen px-5'}>
      <div className={'flex flex-col items-center justify-center' +
        ' h-[80vh]'}>
        <Card className={'box w-50% lg:w-1/4 flex flex-col' +
          ' items-center rounded-md p-5 bg-gray-900'}>
          <RemoveShoppingCartIcon sx={{fontSize: "3rem", marginBottom: "1rem",color: red[500]}}/>
          <h1>Order canceled :(</h1>
          <p className={'py-3 text-center text-gray-400'}>Click the button below to return to your cart </p>
          <Button onClick={() => router.push("/cart")}
                  variant={'contained'}
                  className={'py-5'}
                  sx={{margin: "1rem 0rem", marginTop:"0", height:"30px"}}>Return to cart</Button>
        </Card>
      </div>
    </div>
  );
}

export default Fail;