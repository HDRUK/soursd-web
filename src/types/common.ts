import { ReactNode } from "react";
import { SweetAlertResult } from "sweetalert2";

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface Option {
  label: string;
  value: string;
  href?: string;
}

export interface ShowAlertOptions {
  id?: string;
  text?: string;
  title?: string | undefined;
  confirmButtonText?: string | undefined;
  cancelButtonText?: string | undefined;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  willClose?<T>(
    payload: T | null | undefined
  ): Promise<void | undefined> | void;
  preConfirm?<T>(
    payload: T | null | undefined
  ): Promise<void | undefined> | void;
  preDeny?: () => void | undefined;
  untilDuration?: number;
}

export type ModuleWithTranslations<T> = T & {
  t?: (key: string) => ReactNode;
};

export type ShowAlert = Promise<SweetAlertResult> | null;

export type TranslationsProps<T> = T & {
  t: (key: string) => string;
};
