import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface FormControlCheckboxProps extends CheckboxProps {
  label: ReactNode;
  labelCaption?: ReactNode;
}

export default function FormControlCheckbox({
  label,
  labelCaption,
  ...restProps
}: FormControlCheckboxProps) {
  return (
    <FormControlLabel
      sx={{ alignItems: "flex-start" }}
      control={<Checkbox sx={{ mt: "-7px" }} {...restProps} />}
      label={
        <>
          <Typography variant="subtitle1">{label}</Typography>
          {labelCaption && (
            <Typography variant="caption" color="caption.main">
              {labelCaption}
            </Typography>
          )}
        </>
      }
    />
  );
}
