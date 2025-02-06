"use client";

import theme from "@/theme";
import { showAlert } from "@/utils/showAlert";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { handleLogin, handleLogout, handleRegister } from "@/utils/keycloak";
import ContactLink from "@/components/ContactLink";
import ReactDOMServer from "react-dom/server";

const Error = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams?.get("type");
  const t = useTranslations(`Error.${type}`);

  const getButtonAction = (type: string) => {
    switch (type) {
      case "login":
        return () => handleLogin();
      case "register":
        return () => handleRegister();
      case "logout":
        return () => handleLogout();
      default:
        return undefined;
    }
  };

  useEffect(() => {
    if (type) {
      const title = t("title");
      const navigateButton = t("navigateButton");
      const hasNavigateButton =
        navigateButton !== `Error.${type}.navigateButton`;

      const errorMessage = ReactDOMServer.renderToString(
        t.rich("message", { contact: ContactLink }) ?? t("message")
      );

      showAlert("error", {
        text: errorMessage,
        title,
        preConfirm: getButtonAction(type),
        confirmButtonText: t("primaryButton"),
        cancelButtonText: hasNavigateButton ? navigateButton : undefined,
        preDeny: hasNavigateButton
          ? () => router.push(t("navigatePath"))
          : undefined,
      });
    }
  }, [type, t, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `linear-gradient(90deg, ${theme.palette.background1.light} 0%, ${theme.palette.background1.extraLight} 35%, #fff 100%)`,
      }}
    />
  );
};

export default Error;
