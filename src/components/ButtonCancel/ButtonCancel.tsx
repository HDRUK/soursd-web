import { Button, ButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";

export type ButtonSaveProps = ButtonProps;

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ButtonCancel({
  children,
  sx,
  ...restProps
}: ButtonSaveProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  return (
    <Button
      variant="outlined"
      sx={{ display: "flex", justifySelf: "flex-start", ...sx }}
      {...restProps}>
      {children || t(`cancel`)}
    </Button>
  );
}
