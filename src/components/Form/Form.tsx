import yup from "@/config/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, BoxProps, Grid } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { AnyObject, SchemaDescription } from "yup";
import FormCanLeave from "../FormCanLeave";
import { Message } from "../Message";

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
  canLeave?: boolean;
  shouldReset?: boolean;
}

export default function Form<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  error,
  onSubmit = () => {},
  canLeave = false,
  shouldReset = false,
  ...restProps
}: FormProps<T>) {
  const formOptions: UseFormProps<T> = {
    defaultValues,
  };

  if (schema) {
    formOptions.resolver = yupResolver(schema) as unknown as Resolver<T>;
  }

  const methods = useForm<T>(formOptions);
  const { handleSubmit, reset } = methods;

  const extendedMethods: ExtendedUseFormReturn<T> = {
    ...methods,
    isFieldRequired: (fieldName: keyof T): boolean =>
      schema ? isFieldRequired(schema, fieldName as string) : false,
  };

  const handleFormSubmit = (values: T) => {
    onSubmit(values);
    if (shouldReset) {
      reset(defaultValues);
    }
  };

  return (
    <FormProvider {...extendedMethods}>
      <FormCanLeave canLeave={canLeave}>
        <Box
          component="form"
          onSubmit={event => {
            event.preventDefault();
            handleSubmit(handleFormSubmit)(event);
            event.stopPropagation();
          }}
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
