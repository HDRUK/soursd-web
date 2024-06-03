"use client";

import UploadLink from "@/components/UploadLink";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_CV = "Cv";

export default function CVUpload() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CV);

  return (
    <UploadLink
      fileName="sample.file.doc"
      maxSize={t("maxSize")}
      linkProps={{ title: t("download"), href: "/" }}
    />
  );
}
