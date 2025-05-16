"use client";

import ContactLink from "@/components/ContactLink";
import { ShowAlert, ShowAlertOptions } from "../../types/common";
import { MutationState, QueryState } from "../../types/form";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { MutableRefObject, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { SweetAlertIcon } from "sweetalert2";

const NAMESPACE_TRANSALATIONS_APPLICATION = "Application";

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

export default function useQueryAlerts(
  query: QueryState | MutationState,
  alertOptions?: QueryAlertOptions,
  ref?: MutableRefObject<ShowAlert | undefined>
) {
  const t = useTranslations(NAMESPACE_TRANSALATIONS_APPLICATION);
  const internalRef = useRef<ShowAlert>();

  const defaultRef = ref || internalRef;

  const mergedSuccessAlertProps = {
    text: t("alertSuccessDescription"),
    title: t("alertSuccessTitle"),
    confirmButtonText: t("alertSuccessConfirmButton"),
    ...alertOptions?.commonAlertProps,
    ...alertOptions?.successAlertProps,
    willClose: () => {
      defaultRef.current = null;

      alertOptions?.commonAlertProps?.willClose?.();
      alertOptions?.successAlertProps?.willClose?.();

      query.reset?.();
    },
  };

  const mergedErrorAlertProps = {
    text: ReactDOMServer.renderToString(
      t.rich("alertErrorDescription", {
        contactLink: ContactLink,
      })
    ),
    title: t("alertErrorTitle"),
    confirmButtonText: t("alertErrorConfirmButton"),
    ...alertOptions?.commonAlertProps,
    ...alertOptions?.errorAlertProps,
    willClose: () => {
      defaultRef.current = null;

      alertOptions?.commonAlertProps?.willClose?.();
      alertOptions?.errorAlertProps?.willClose?.();

      query.reset?.();
    },
  };

  const isEnabled =
    alertOptions?.enabled === undefined || alertOptions?.enabled === true;

  if (!defaultRef?.current && isEnabled) {
    if (query.isError) {
      defaultRef.current = showAlert(
        alertOptions?.errorAlertType || "error",
        mergedErrorAlertProps
      );
    } else if (query.isSuccess && !alertOptions?.showOnlyError) {
      defaultRef.current = showAlert(
        alertOptions?.successAlertType || "success",
        mergedSuccessAlertProps
      );
    }
  }
}
