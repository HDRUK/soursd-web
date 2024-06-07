"use client";

import UploadLink from "@/components/UploadLink";
import { FormMutateState } from "@/types/form";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, useCallback, useRef } from "react";

const NAMESPACE_TRANSLATION_CV = "Cv";

export interface CVDetailsProps {
  mutateState: FormMutateState;
  fileName: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
}

export default function CVDetails({
  onFileChange,
  mutateState,
  fileName,
}: CVDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CV);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileSelectorOpen = useCallback(() => {
    ref.current?.click();
  }, []);

  return (
    <>
      <UploadLink
        isLoading={mutateState.isLoading}
        fileName={fileName}
        maxSize={t("maxSize")}
        linkProps={{
          title: t("download"),
          href: `${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL}/1717757687_Fake%20cv.docx`,
        }}
        iconButtonProps={{
          "aria-label": t("uploadButtonLabel"),
        }}
        onFileSelectorOpen={handleFileSelectorOpen}
      />
      <input
        aria-label={t("fileInputLabel")}
        id="cvFileInput"
        type="file"
        style={{ display: "none" }}
        ref={ref}
        onChange={onFileChange}
      />
    </>
  );
}
