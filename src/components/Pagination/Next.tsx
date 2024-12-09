import React from "react";
import { ArrowRight } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Text from "../Text";

const NAMESPACE_TRANSLATIONS = "Pagination";

const Next = () => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return <Text endIcon={<ArrowRight />}>{t("nextButtonLabel")}</Text>;
};

export default Next;
