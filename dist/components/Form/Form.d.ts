import yup from "@/config/yup";
import { BoxProps } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { AnyObject } from "yup";
import { FormModalProps } from "../FormModal";
export type ExtendedUseFormReturn<T extends FieldValues> = UseFormReturn<T> & {
    isFieldRequired: (fieldName: keyof T) => boolean;
};
export interface FormProps<T extends AnyObject> extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
    children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
    autoComplete?: "off";
    error?: ReactNode;
    onSubmit?: (values: T) => void;
    sx?: BoxProps["sx"];
    defaultValues?: DefaultValues<T>;
    schema?: yup.ObjectSchema<T>;
    canLeave?: boolean;
    shouldReset?: boolean;
    shouldResetKeep?: boolean;
    isModal?: boolean;
    modalProps?: Omit<FormModalProps, "formState">;
    disabled?: boolean;
}
export default function Form<T extends FieldValues>({ children, defaultValues, schema, error, onSubmit, canLeave, shouldReset, shouldResetKeep, isModal, modalProps, disabled, ...restProps }: FormProps<T>): import("react/jsx-runtime").JSX.Element;
