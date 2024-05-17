"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { Alert, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";
const NAMESPACE_TRANSLATION_PAGES = "Pages";

export default function Page() {
  const lastUrl = useStore(store => store.getPreviousUrl());
  const { routes } = useApplicationData();
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const tPages = useTranslations(NAMESPACE_TRANSLATION_PAGES);
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <>
      <Typography variant="h4" sx={{ py: 1, mb: 3 }}>
        {tPages(`${routes.profileIssuer.key}.title`)}
      </Typography>
      {routes.signupIssuer.path === lastUrl && showSuccess && (
        <Alert
          color="success"
          onClose={() => {
            setShowSuccess(false);
          }}>
          {tSignup("submitSuccess")}
        </Alert>
      )}
      Content
    </>
  );
}
