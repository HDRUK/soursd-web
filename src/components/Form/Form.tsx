import yup from "@/config/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, BoxProps, Grid } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";
import {
  UseFormProps,
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
  Resolver,
} from "react-hook-form";
import { AnyObject } from "yup";
import { Message } from "../Message";

export interface FormProps<T extends AnyObject>
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  autoComplete?: "off";
  error?: ReactNode;
  onSubmit?: (values: T) => void;
  sx?: BoxProps["sx"];
  defaultValues?: DefaultValues<T>;
  schema?: yup.ObjectSchema<T>;
}

export default function Form<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  error,
  onSubmit = () => {},
  ...restProps
}: FormProps<T>) {
  const formOptions: UseFormProps<T> = {
    defaultValues,
  };

  if (schema) {
    formOptions.resolver = yupResolver(schema) as unknown as Resolver<T>;
  }

  const methods = useForm<T>(formOptions);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        {...restProps}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          ...restProps.sx,
        }}>
        {error && (
          <Grid item xs={12}>
            <Message severity="error" sx={{ mb: 3 }}>
              {error}
            </Message>
          </Grid>
        )}
        {typeof children === "function" ? children(methods) : children}
      </Box>
    </FormProvider>
  );
}
