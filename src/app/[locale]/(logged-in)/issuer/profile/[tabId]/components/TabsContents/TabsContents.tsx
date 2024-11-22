"use client";

import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import { ISSUER_ID } from "@/consts/application";
import { getIssuer } from "@/services/issuers";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";

interface TabsContentsProps {
  tabId: string;
}

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function TabsContents({ tabId }: TabsContentsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getIssuer"],
    queryFn: () =>
      getIssuer(ISSUER_ID, {
        error: {
          message: "getIssuer",
        },
      }),
  });

  if (isLoading) {
    return (
      <OverlayCenter variant="contained">
        <CircularProgress aria-label={t("loadingAriaLabel")} />
      </OverlayCenter>
    );
  }

  if (isError || !data?.data) {
    return (
      <Message severity="error" sx={{ mb: 3 }}>
        {t.rich(error, {
          contactLink: ContactLink,
        })}
      </Message>
    );
  }

  return (
    <>
      {tabId === PageTabs.DETAILS && <Details issuer={data?.data} />}
      {tabId === PageTabs.USERS && "Users"}
      {tabId === PageTabs.CONFIGURATION && "Configuration"}
      {tabId === PageTabs.KEYCARDS && "Keycards"}
    </>
  );
}
