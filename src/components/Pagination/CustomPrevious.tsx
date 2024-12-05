import React from "react";
import { ArrowLeft } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Pagination";

const CustomPrevious = () => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <ArrowLeft style={{ marginLeft: 4 }} />
      {t("previousButtonLabel")}
    </span>
  );
};

export default CustomPrevious;
