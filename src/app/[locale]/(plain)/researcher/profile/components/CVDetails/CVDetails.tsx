"use client";

import FileLink from "@/components/FileLink";
import { MessageInline } from "@/components/Message";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { FormMutateState } from "@/types/form";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import prettyBytes from "pretty-bytes";
import { ChangeEventHandler } from "react";

const NAMESPACE_TRANSLATION_CV = "Cv";

export interface CVDetailsProps {
  mutateState: FormMutateState;
  fileName: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  isFileSizeTooBig?: boolean;
}

export default function CVDetails({
  onFileChange,
  mutateState,
  fileName,
  isFileSizeTooBig,
}: CVDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CV);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FileLink
        isLoading={mutateState.isLoading}
        fileName={fileName}
        href={`${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL}/1717757687_Fake%20cv.docx`}
        maxSizeLabel={t("maxSize", {
          size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
        })}
        linkProps={{
          title: t("download"),
        }}
        iconButtonProps={{
          "aria-label": t("uploadButtonLabel"),
        }}
        inputProps={{
          "aria-label": t("fileInputLabel"),
        }}
        onFileChange={onFileChange}
      />
      {isFileSizeTooBig && (
        <div>
          <MessageInline color="error">
            {t("sizeError", {
              size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
            })}
          </MessageInline>
        </div>
      )}
    </Box>
  );
}
