import { ShowAlert, ShowAlertOptions } from "@/types/common";
import { MutationState, QueryState } from "@/types/form";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { SweetAlertIcon } from "sweetalert2";
import useQueryAlerts, { QueryAlertOptions } from "../useQueryAlerts";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

export interface QueryAlertConfirmOptions
  extends Omit<QueryAlertOptions, "enabled"> {
  confirmAlertType?: SweetAlertIcon;
  confirmAlertProps?: ShowAlertOptions;
  successAlertType?: SweetAlertIcon;
  successAlertProps?: ShowAlertOptions;
  errorAlertType?: SweetAlertIcon;
  errorAlertProps?: ShowAlertOptions;
}

export default function useQueryConfirmAlerts(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertConfirmOptions
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const ref = useRef<ShowAlert>();
  const [hasClosed, setHasClosed] = useState(false);

  const mergedConfirmAlertProps = {
    ...alertOptions?.confirmAlertProps,
    text: t("alertDeleteDescription"),
    title: t("alertDeleteTitle"),
    confirmButtonText: t("alertDeleteConfirmButton"),
    cancelButtonText: t("alertDeleteCancelButton"),
    preConfirm: () => {
      setHasClosed(true);
    },
    willClose: () => {
      ref.current = null;

      alertOptions?.confirmAlertProps?.willClose?.();
    },
  };

  useQueryAlerts(query, { ...alertOptions, enabled: hasClosed }, ref);

  return useCallback(() => {
    if (!ref.current) {
      ref.current = showAlert(
        alertOptions?.confirmAlertType || "warning",
        mergedConfirmAlertProps
      );

      console.log("******* ref.current", ref.current);
    }
  }, []);
}
