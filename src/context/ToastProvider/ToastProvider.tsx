"use client";

import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

const StyledToastContainer = styled(ToastContainer)(
  ({ theme }) => `
  .Toastify__toast--default {
    background: ${theme.palette.background1.light};
    color: #aaa;
  }

  .Toastify__toast--info {
    background: ${theme.palette.info.main};
    color: ${theme.palette.info.contrastText};
  }

  .Toastify__toast--success {
    background: ${theme.palette.success.main};
  }

  .Toastify__toast--warning {
    background: ${theme.palette.warning.main};
  }

  .Toastify__toast--error {
    background: ${theme.palette.error.main};
    color: ${theme.palette.error.contrastText};

    svg {
      fill: ${theme.palette.error.contrastText}
    }
  }

  .Toastify__toast--error {
    background: ${theme.palette.error.main};
    color: ${theme.palette.error.contrastText};

    svg {
      fill: ${theme.palette.error.contrastText}
    }
  }

  .Toastify__progress-bar--bg {
      background: #fff;
      opacity: 0.6;
  }
`
);

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <StyledToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
