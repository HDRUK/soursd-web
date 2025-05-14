import { ShowAlert, ShowAlertOptions } from "@/types/common";
import { MutationState, QueryState } from "@/types/form";
import { MutableRefObject } from "react";
import { SweetAlertIcon } from "sweetalert2";
export interface QueryAlertOptions {
    commonAlertProps?: ShowAlertOptions;
    confirmAlertType?: SweetAlertIcon;
    confirmAlertProps?: ShowAlertOptions;
    successAlertType?: SweetAlertIcon;
    successAlertProps?: ShowAlertOptions;
    errorAlertType?: SweetAlertIcon;
    errorAlertProps?: ShowAlertOptions;
    enabled?: boolean;
    showOnlyError?: boolean;
}
export default function useQueryAlerts(query: QueryState | MutationState, alertOptions?: QueryAlertOptions, ref?: MutableRefObject<ShowAlert | undefined>): void;
