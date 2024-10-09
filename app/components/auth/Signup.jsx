"use client";
import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import {Field, Form, Formik} from "formik";
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '@/app/redux/slice/authSlice';
import {useEffect} from 'react';
import {useRouter} from "next/navigation";

const initialValues = {
  username: "", email: "", password: "",
};

const textFieldStyles = {
  position: 'relative', right: '50px', width: 'calc(100% + 50px)', '& .MuiInputBase-root': {
    borderBottom: '2px solid black',
  }, '& .MuiInputBase-root:before': {
    borderBottom: 'none',
  }, '& .MuiInputBase-root:hover:before': {
    borderBottom: 'none',
  }, '& .MuiInputBase-root:after': {
    borderBottom: 'none',
  }, '& .MuiInputBase-root.Mui-focused:after': {
    borderBottom: '2px solid black',
  },
};

const Signup = () => {
  const dispatch = useDispatch();
  const {isLoading, error: authError} = useSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = (values, e) => {
    const userData = {
      username: values.username, email: values.email, password: values.password,
    };
    dispatch(registerUser({userData, router}));
  };


  return (<div className='flex justify-center items-center h-screen bg-[#0D0D0D] px-4 sm:px-8'>
    <div className='relative shadow-lg w-[700px] h-[450px] flex overflow-hidden'>
      <div
        className='bg-black p-8 flex flex-col justify-center text-white relative z-10'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 25% 100%, 0% 100%)', textAlign: 'left', width: '60%',
        }}
      >
        <div className={'w-[25%]'}>
          <h2 className='text-xl font-bold mb-2 text-start'>WELCOME!</h2 >
          <p className='text-sm text-start text-gray-400'>
            We are guessing you&apos;re bookworm like us, you&apos;re in the right place!
          </p >
          <p className='text-sm text-start mt-1 text-gray-600'>
            Signup to get started.
          </p >
        </div >
      </div >

      <div
        className='bg-white p-8 flex flex-col justify-center rounded-r-lg relative z-10'
        style={{width: '40%'}}
      >
        <h2 className='text-2xl font-semibold mb-6 text-black text-center'>Sign Up</h2 >

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form >
            <Field
              as={TextField}
              name={"username"}
              label={"Username"}
              fullWidth
              variant={"standard"}
              margin={"normal"}
              InputLabelProps={{
                style: {color: 'black'},
              }}
              InputProps={{
                style: {
                  color: 'black',
                }, placeholder: 'Enter your username',
              }}
              sx={textFieldStyles}
              multiline={false}
            />

            <Field
              as={TextField}
              name={"email"}
              label={"Email"}
              fullWidth
              variant={"standard"}
              margin={"normal"}
              InputLabelProps={{
                style: {color: 'black'},
              }}
              InputProps={{
                style: {
                  color: 'black',
                }, placeholder: 'Enter your email',
              }}
              sx={textFieldStyles}
              multiline={false}
            />

            <Field
              as={TextField}
              name={"password"}
              label={"Password"}
              fullWidth
              variant={"standard"}
              type={"password"}
              margin={"normal"}
              InputLabelProps={{
                style: {color: 'black'},
              }}
              InputProps={{
                style: {
                  color: 'black',
                }, placeholder: 'Enter your password',
              }}
              sx={textFieldStyles}
              multiline={false}
            />
            <div className={'flex justify-center'}>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  borderRadius: '20px', bgcolor: 'black', color: 'white', width: 'calc(100% + 50px)', mt: 3, '&:hover': {
                    bgcolor: 'darkgray',
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button >
            </div >
          </Form >
        </Formik >


        <span className={'text-sm text-black  mt-5'}>
                  Already have an account?
            <Link
              href='/auth/login' className='text-sm text-black cursor-pointer text-center block'
            >
             Login
            </Link >
          </span >
      </div >

      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', clipPath: 'polygon(100% 0, 0% 0, 0% 100%, 75% 100%)', zIndex: 3,
        }}
      />
    </div >
  </div >);
};

export default Signup;