import yup from "@/config/yup";
import { isFieldRequired } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, BoxProps, Grid } from "@mui/material";
import { HTMLAttributes, ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  Resolver,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { AnyObject } from "yup";
import FormCanLeave from "../FormCanLeave";
import FormModal, { FormModalProps } from "../FormModal";
import { Message } from "../Message";

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
  shouldResetKeep?: boolean;
  isModal?: boolean;
  modalProps?: Omit<FormModalProps, "formState">;
}

export default function Form<T extends FieldValues>({
  children,
  defaultValues,
  schema,
  error,
  onSubmit = () => {},
  canLeave = false,
  shouldReset = false,
  shouldResetKeep = false,
  isModal,
  modalProps,
  ...restProps
}: FormProps<T>) {
  const formOptions: UseFormProps<T> = {
    defaultValues,
    ...(schema && {
      resolver: yupResolver(schema) as unknown as Resolver<T>,
    }),
  };

  const methods = useForm<T>(formOptions);
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (defaultValues && !deepEqual(defaultValues, methods.getValues())) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        methods.setValue(key as Path<T>, value, {
          shouldDirty: true,
        });
      });
    }
  }, [defaultValues]);

  const extendedMethods: ExtendedUseFormReturn<T> = {
    ...methods,
    isFieldRequired: (fieldName: keyof T): boolean =>
      schema ? isFieldRequired(schema, fieldName as string) : false,
  };

  const handleFormSubmit = (values: T) => {
    onSubmit(values);

    if (shouldResetKeep) {
      reset(values);
    } else if (shouldReset) {
      reset(defaultValues);
    }
  };

  const form = (
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

  return isModal ? <FormModal {...modalProps}>{form}</FormModal> : form;
}
