import yup from "@/config/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, BoxProps, Grid } from "@mui/material";
import { HTMLAttributes, ReactNode, useEffect } from "react";
import {
  UseFormProps,
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
  Resolver,
} from "react-hook-form";
import { AnyObject, SchemaDescription } from "yup";
import { useRouter } from "next/router";
import { Message } from "../Message";
import useRouteChange from "@/hooks/useRouteChange";
import FormCanLeave from "../FormCanLeave";

function isFieldRequired(
  schema: yup.AnyObjectSchema,
  fieldName: string
): boolean {
  const fieldSchema = schema.describe().fields[fieldName] as
    | SchemaDescription
    | undefined;
  if (!fieldSchema) {
    return false;
  }
  return !fieldSchema.optional;
}

export type ExtendedUseFormReturn<T extends FieldValues> = UseFormReturn<T> & {
  isFieldRequired: (fieldName: keyof T) => boolean;
};

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

  const extendedMethods: ExtendedUseFormReturn<T> = {
    ...methods,
    isFieldRequired: (fieldName: keyof T): boolean =>
      schema ? isFieldRequired(schema, fieldName as string) : false,
  };

  console.log(methods.formState);

  return (
    <FormProvider {...extendedMethods}>
      <FormCanLeave isDirty={methods.formState.isDirty}>
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
          {typeof children === "function"
            ? children(extendedMethods)
            : children}
        </Box>
      </FormCanLeave>
    </FormProvider>
  );
}
