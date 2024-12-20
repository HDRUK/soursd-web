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
  defaultValue: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldsConfig = FormFieldConfig<ComponentType<any>>[];

export type FormSection = {
  sectionName: string;
  sectionTitle: string;
  sectionSx?: SxProps;
  fields: FormFieldsConfig;
};

export type FormConfig = FormSection[];
