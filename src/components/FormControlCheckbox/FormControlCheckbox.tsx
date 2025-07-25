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
      sx={{ alignItems: "flex-start" }}
      control={
        <Checkbox
          sx={{ mt: "-7px" }}
          {...field}
          checked={checked}
          {...restProps}
        />
      }
      label={
        <>
          <Typography variant="subtitle1">{label}</Typography>
          {labelCaption && (
            <Typography variant="small" color="textSecondary.main">
              {labelCaption}
            </Typography>
          )}
        </>
      }
    />
  );
}
