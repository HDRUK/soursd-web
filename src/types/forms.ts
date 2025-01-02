import yup from "@/config/yup";
import { ComponentType, ComponentProps } from "react";
import { SxProps } from "@mui/system";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldConfig<T extends ComponentType<any>> = {
  name: string;
  label: string;
  component: T;
  componentProps?: ComponentProps<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: yup.Schema<any>;
  defaultValue: string | number | boolean | Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldsConfig = FormFieldConfig<ComponentType<any>>[];

export type FormSection = {
  sectionTitle: string;
  sectionBoxSx?: SxProps;
  fields: FormFieldsConfig;
};

export type FormConfig = FormSection[];
