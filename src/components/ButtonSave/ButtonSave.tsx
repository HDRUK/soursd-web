import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Button, ButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";

export interface ButtonSaveProps extends LoadingButtonProps {
  isLoading?: boolean;
  component?: ButtonProps["component"];
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ButtonSave({
  isLoading,
  children,
  sx,
  disabled,
  component,
  ...restProps
}: ButtonSaveProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const commonProps = {
    endIcon: <SaveIcon />,
    sx: { display: "flex", justifySelf: "end", ...sx },
  };

  return !component ? (
    <LoadingButton
      {...restProps}
      {...commonProps}
      type="submit"
      loading={isLoading}
      disabled={isLoading || disabled}>
      {children || t(`saveButton`)}
    </LoadingButton>
  ) : (
    <Button component={component} {...restProps} {...commonProps}>
      {children || t(`saveButton`)}
    </Button>
  );
}
