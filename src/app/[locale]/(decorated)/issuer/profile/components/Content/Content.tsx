"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { Alert, Typography } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const lastUrl = useStore(store => store.getPreviousUrl());
  const { routes } = useApplicationData();
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <>
      <Typography variant="h4" sx={{ py: 1, mb: 3 }}>
        Profile page
      </Typography>
      {routes.signupIssuer.path === lastUrl && showSuccess && (
        <Alert
          color="success"
          onClose={() => {
            setShowSuccess(false);
          }}>
          You have successfull subscribed
        </Alert>
      )}
      Content
    </>
  );
}
