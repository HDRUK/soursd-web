import useRouteChange from "@/hooks/useRouteChange";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useFormState, useWatch } from "react-hook-form";

interface FormCanLeaveProps {
  isDirty?: boolean;
  children: ReactNode;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormCanLeave({ children }: FormCanLeaveProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const formState = useFormState();
  const isDirty = !!Object.keys(formState.dirtyFields).length;

  useWatch();

  const { continueTo } = useRouteChange({
    canLeave: !isDirty,
    onBlocked: (pathname: string | null) => {
      showAlert("warning", {
        text: "You have unsaved changes",
        title: "Are you sure you want to leave the form with unsaved changes?",
        cancelButtonText: "Go back",
        confirmButtonText: "Leave form",
        closeOnConfirm: true,
        closeOnCancel: true,
        preConfirm: () => {
          if (pathname) continueTo(pathname);
        },
      });
    },
  });

  return children;
}
