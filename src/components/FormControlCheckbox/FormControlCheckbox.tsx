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
      control={<Checkbox {...restProps} />}
      label={
        <>
          <Typography variant="h5">{label}</Typography>
          {labelCaption && (
            <Typography color="caption.main">{labelCaption}</Typography>
          )}
        </>
      }
    />
  );
}
