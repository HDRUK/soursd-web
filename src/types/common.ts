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
  willClose?<T>(payload: T | null | undefined): Promise<void | undefined>;
  preConfirm?<T>(payload: T | null | undefined): Promise<void | undefined>;
  preDeny?: () => void | undefined;
  untilDuration?: number;
}

export type ShowAlert = Promise<SweetAlertResult> | null;
