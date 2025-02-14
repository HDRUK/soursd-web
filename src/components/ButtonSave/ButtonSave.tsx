import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useTranslations } from "next-intl";

export interface ButtonSaveProps extends LoadingButtonProps {
  isLoading?: boolean;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ButtonSave({
  isLoading,
  children,
  sx,
  ...restProps
}: ButtonSaveProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  return (
    <LoadingButton
      endIcon={<SaveIcon />}
      {...restProps}
      type="submit"
      loading={isLoading}
      disabled={isLoading}
      sx={{ display: "flex", justifySelf: "end", ...sx }}>
      {children || t(`saveButton`)}
    </LoadingButton>
  );
}
