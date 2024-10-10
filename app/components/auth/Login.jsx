"use client";
import React from 'react';
import { TextField, Button } from '@mui/material';
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/redux/slice/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const textFieldStyles = {
  position: 'relative',
  left: { xs: '42px', sm: '50px', md: '65px' },
  marginLeft: { xs: '-62px', sm: '-50px', md: '-65px' },
  width: { xs: 'calc(100% + 100px)', sm: 'calc(100% + 50px)', md: 'calc(100% + 65px)' },
  '& .MuiInputBase-root': {
    borderBottom: '2px solid black',
  },
  '& .MuiInputBase-root:before': {
    borderBottom: 'none',
  },
  '& .MuiInputBase-root:hover:before': {
    borderBottom: 'none',
  },
  '& .MuiInputBase-root:after': {
    borderBottom: 'none',
  },
  '& .MuiInputBase-root.Mui-focused:after': {
    borderBottom: '2px solid black',
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = (values) => {
    const userData = {
      username: values.email,
      password: values.password,
    };
    dispatch(loginUser({ userData, router }));
  };

  return (
    <div id="login" className='flex justify-center items-center h-screen bg-[#0D0D0D] px-4 sm:px-8'>
      <div className='relative shadow-lg w-[700px] h-[450px] flex overflow-hidden'>
        <div className='bg-white p-8 flex flex-col justify-center rounded-l-lg relative z-10' style={{ width: "35%" }}>
          <h2 className='text-2xl font-semibold mb-6 text-black text-start'>Login</h2>

          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="standard"
                margin="normal"
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                InputProps={{
                  style: { color: 'black' },
                  placeholder: 'Enter your email',
                }}
                sx={textFieldStyles}
                multiline={false}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                fullWidth
                variant="standard"
                type="password"
                margin="normal"
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                InputProps={{
                  style: { color: 'black' },
                  placeholder: 'Enter your password',
                }}
                sx={textFieldStyles}
                multiline={false}
              />

              <div className='flex justify-center'>
                <div style={{ width: '100%'}}>
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isLoading}
                    sx={{
                      width: '100%',
                      borderRadius: '5px',
                      bgcolor: 'black',
                      color: 'white',
                      mt: 3,
                      '&:hover': {
                        bgcolor: 'darkgray',
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'gray',
                        color: 'white',
                      }
                    }}
                  >
                    {isLoading ? 'Logging in...' : 'Log in'}
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
          <span className='text-sm text-black mt-5 w-60'>
            Don’t have an account?
            <Link href='/auth/signup' className='text-sm text-black cursor-pointer block text-start mt-1'>
              Sign up
            </Link>
          </span>

        </div>

        <div
          className='text-white flex flex-col justify-center items-end relative px-3'
          style={{
            backgroundColor: 'black',
            clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 80% 100%)',
            textAlign: 'left',
            zIndex: 5,
            width: "70%",
          }}
        >
          <div className='w-[55%]'>
            <h2 className='text-xl font-bold mb-2 text-end'>WELCOME BACK!</h2>
            <p className='text-sm text-end text-gray-600'>
              Great to see you again, genius.
            </p>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
};

export default Login;