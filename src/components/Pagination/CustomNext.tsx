import React from "react";
import { ArrowRight } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Pagination";

const CustomNext = () => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      {t("nextButtonLabel")}
      <ArrowRight style={{ marginLeft: 4 }} />
    </span>
  );
};

export default CustomNext;
