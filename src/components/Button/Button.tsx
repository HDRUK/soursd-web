import { Button as MUIButton } from '@mui/material';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { ReactNode } from 'react';

export interface ButtonProps extends MuiButtonProps {
    children: ReactNode
}

export default function Button({
    variant = 'text',
    children,
    color
  }: ButtonProps) {
    return (
        <MUIButton variant={variant} color={color}>
            {children}
        </MUIButton>
    )
}