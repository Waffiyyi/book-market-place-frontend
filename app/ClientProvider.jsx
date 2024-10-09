"use client";

import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AuthWrapper from "@/app/AuthWrapper";
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#d511e8",
    },
    background: {
      main: "#000000",
      default: "#0D0D0D",
      paper: "#000000",
    },
    textColor: {
      main: "#ffffff",
    },
  },
});

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </ThemeProvider>
    </Provider>
  );
}