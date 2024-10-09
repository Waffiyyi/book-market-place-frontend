import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useError } from './ErrorContext';

const Error = () => {
  const { error } = useError();

  return (
    <Snackbar open={!!error} autoHideDuration={6000}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default Error;