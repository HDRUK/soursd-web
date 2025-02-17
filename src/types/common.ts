import { SweetAlertResult } from "sweetalert2";

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
  willClose?: () => void;
  preConfirm?: () => void | undefined;
  preDeny?: () => void | undefined;
  untilDuration?: number;
}

export type ShowAlert = Promise<SweetAlertResult> | null;
