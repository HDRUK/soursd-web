import { ShowAlertOptions } from "@/types/common";
import { MutationState, QueryState } from "@/types/form";
import { SweetAlertIcon } from "sweetalert2";
import { QueryAlertOptions } from "../useQueryAlerts";
export interface QueryAlertConfirmOptions extends Omit<QueryAlertOptions, "enabled"> {
    confirmAlertType?: SweetAlertIcon;
    confirmAlertProps?: ShowAlertOptions;
    successAlertType?: SweetAlertIcon;
    successAlertProps?: ShowAlertOptions;
    errorAlertType?: SweetAlertIcon;
    errorAlertProps?: ShowAlertOptions;
}
export default function useQueryConfirmAlerts<T>(query: QueryState | MutationState, alertOptions?: QueryAlertConfirmOptions): (payload: T) => void;
