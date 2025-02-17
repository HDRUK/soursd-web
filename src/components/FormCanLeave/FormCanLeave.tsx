import useRouteChange from "@/hooks/useRouteChange";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useFormState, useWatch } from "react-hook-form";

interface FormCanLeaveProps {
  children?: ReactNode;
  overrideLeave?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormCanLeave({
  children,
  overrideLeave,
}: FormCanLeaveProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const formState = useFormState();
  const isDirty = !!Object.keys(formState.dirtyFields).length;

  useWatch();

  const { continueTo } = useRouteChange({
    canLeave: !isDirty || overrideLeave,
    onBlocked: (pathname: string | null) => {
      showAlert("warning", {
        text: t("unsavedAlertText"),
        title: t("unsavedAlertTitle"),
        cancelButtonText: t("unsavedAlertCancelButton"),
        confirmButtonText: t("unsavedAlertConfirmButton"),
        preConfirm: () => {
          if (pathname) continueTo(pathname);
        },
      });
    },
  });

  return children;
}
