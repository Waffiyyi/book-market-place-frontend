"use client";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllErrors } from '@/app/redux/selectors';
import { Alert, Snackbar } from "@mui/material";
import { clearError as clearAuthError } from '@/app/redux/slice/authSlice';
import { clearError as clearBookError } from '@/app/redux/slice/bookSlice';
import { clearError as clearCartError } from '@/app/redux/slice/cartSlice';

const Error = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectAllErrors);

  const handleSnackbarClose = (errorType) => {
    if (errorType === 'auth') dispatch(clearAuthError());
    if (errorType === 'book') dispatch(clearBookError());
    if (errorType === 'cart') dispatch(clearCartError());
  };

  return (
    <>
      {errors.map((error, index) => (
        <Snackbar
          key={index}
          open={!!error.message}
          autoHideDuration={4000}
          onClose={() => handleSnackbarClose(error.type)}
        >
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Error;