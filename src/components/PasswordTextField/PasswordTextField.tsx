import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  IconButtonProps,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export type PasswordTextFieldProps = TextFieldProps & {
  iconButtonProps: IconButtonProps;
  id: string;
};

export default function PasswordTextField({
  iconButtonProps,
  id,
  ...restProps
}: PasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useFormContext();

  return (
    <TextField
      {...restProps}
      {...register(id)}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              {...iconButtonProps}
              onClick={() => setShowPassword(!showPassword)}
              edge="end">
              {showPassword ? (
                <VisibilityOff data-testid="visibility-off" />
              ) : (
                <Visibility data-testid="visibility-on" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
