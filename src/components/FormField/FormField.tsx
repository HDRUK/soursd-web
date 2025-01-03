import { Box, BoxProps, TextField } from "@mui/material";
import { useController } from "react-hook-form";

export interface FormFieldProps extends BoxProps {
  name: string;
}

export default function FormField({
  name,
  component,
  ...restProps
}: FormFieldProps) {
  const { field } = useController({ name });

  return <Box component={component || TextField} {...field} {...restProps} />;
}
