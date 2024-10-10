import React from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/navigation";
import {checkoutCart} from "@/app/redux/slice/cartSlice";
import {useDispatch, useSelector} from "react-redux";

const CartModal = ({ open, onClose, book, subtotal }) => {
  const {cart, loading} = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  let jwt = null;

  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem("jwt");
  }
  const handleCheckout = () => {
    const reqData = {
      cartDTO:{
        id:cart.id,
        userId:cart.userId,
        total:cart.total,
        items:cart.items
      }, dispatch, jwt };
    dispatch(checkoutCart(reqData));
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: '#efe4f0',
          borderRadius: 2,
          p: 4,
          width: '95%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label='close'
          sx={{
            position: 'absolute',
            top: 1,
            right: 2,
          }}
        >
          <CancelIcon sx={{ color: "black" }} />
        </IconButton>

        <div style={{ flex: 1, paddingRight: 16 }}>
          <div className='flex items-center space-x-2 mb-3'>
            <CheckCircleIcon className='text-[#d511e8]' fontSize='small' />
            <div className='flex-1'>
              <p className='text-sm text-gray-600 font-bold'>Added to Cart</p>
            </div>
          </div>
          <Image
            src={book?.image}
            alt={book?.title}
            width={100}
            height={100}
            className='rounded-md'
            unoptimized={true}
          />
        </div>

        <Divider sx={{ bgcolor: "black" }} orientation="vertical" flexItem />

        <div className={'flex-1 pl-16 flex flex-col justify-center'}>
          <p className='text-xl font-bold text-black'>
            Cart Subtotal: ${subtotal}
          </p>

          <div className='mt-4 flex flex-col space-y-2'>
            <Button
              onClick={handleCheckout}
              disabled={loading}
              sx={{
                bgcolor: '#d511e8',
                borderRadius: 3,
                mb: 2,
                '&.Mui-disabled': {
                  bgcolor: '#efe4f0',
                  color: '#d511e8',
                  borderColor:'#d511e8'
                }
              }}
              variant='contained'
              color='secondary'
              className='w-full text-white font-bold hover:bg-purple-500'
            >
              Proceed to Checkout
            </Button>
            <Button
              sx={{
                bgcolor: "#efe4f0",
                borderRadius: 3,
                color: '#d511e8',
                borderColor: '#d511e8',
                mb: 2,
                fontWeight:"bold"
              }}
              variant='outlined'
              className='w-full hover:bg-[#d511e8] hover:text-white'
              onClick={()=>{router.push("/cart")}}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
};

export default CartModal;