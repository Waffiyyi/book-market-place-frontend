import React from 'react';
import { Button } from "@mui/material";

const Newsletter = () => {
  return (
    <div className={'bg-[#0D0D0D]'}>
      <div>
        <p className={'text-center text-gray-600 mb-2'}>Newsletter</p>
        <h1 className={'text-center text-white mb-3 text-xl'}>
          Stay updated with the <span className={'block mt-0.5'}>Latest News!</span>
        </h1>
        <div className={'flex align-middle justify-center px-5 py-2'}>
          <textarea
            className={'bg-black text-gray-50 p-3 rounded-l-full border outline-none w-60'}
            style={{
              borderRight: 'none',
              border: '0.7px solid rgba(255, 255, 255, 0.5)',
              resize: 'none',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
            }}
            placeholder={"Enter your email"}
            maxLength={30}
            rows={1}
            wrap="hard"
          />
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: '50px',
              padding: '10px 24px',
              marginLeft: '-21px',
              border: '0.7px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;