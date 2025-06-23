import { Button, ButtonProps } from "@mui/material";
import { ReactNode, useState } from "react";

export interface ButtonToggleProps extends Omit<ButtonProps, "onToggle"> {
  toggleOffButtonProps: ButtonProps & {
    label: ReactNode;
  };
  toggleOnButtonProps: ButtonProps & {
    label: ReactNode;
  };
  onToggle: (toggle: boolean) => void;
}

export default function ButtonToggle({
  onToggle,
  toggleOffButtonProps,
  toggleOnButtonProps,
  ...restProps
}: ButtonToggleProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <Button
      variant="outlined"
      onClick={() => {
        const toggledState = !toggle;

        setToggle(toggledState);
        onToggle(toggledState);
      }}
      {...restProps}
      {...(!toggle ? toggleOffButtonProps : toggleOnButtonProps)}>
      {!toggle ? toggleOffButtonProps.label : toggleOnButtonProps.label}
    </Button>
  );
}
