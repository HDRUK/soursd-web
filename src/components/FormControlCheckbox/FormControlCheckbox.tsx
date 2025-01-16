import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Control, useFormContext, useController } from "react-hook-form";
import { ReactNode } from "react";

interface FormControlCheckboxProps extends CheckboxProps {
  name: string;
  control?: Control;
  label: ReactNode;
  labelCaption?: ReactNode;
}

export default function FormControlCheckbox({
  name,
  control,
  label,
  labelCaption,
  ...restProps
}: FormControlCheckboxProps) {
  const context = useFormContext();
  const effectiveControl = control || context.control;
  const { field } = useController({
    name,
    control: effectiveControl,
  });

  const checked = !!field.value;

  return (
    <FormControlLabel
<<<<<<< HEAD
      sx={{ alignItems: "flex-start" }}
      control={<Checkbox sx={{ mt: "-7px" }} {...restProps} />}
=======
      control={<Checkbox {...field} checked={checked} {...restProps} />}
>>>>>>> 12e9c323e7e42f229058e4cc57f58a2dd0caf987
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
