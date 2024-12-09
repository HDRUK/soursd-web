import React from "react";
import { ArrowLeft } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Text from "../Text";

const NAMESPACE_TRANSLATIONS = "Pagination";

const Previous = () => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return <Text startIcon={<ArrowLeft />}>{t("previousButtonLabel")}</Text>;
};
export default Previous;
