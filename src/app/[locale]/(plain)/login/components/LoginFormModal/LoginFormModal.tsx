"use client";

import FormModal from "@/components/FormModal";
import { useApplicationData } from "@/context/ApplicationData";
import { postUserLogin } from "@/services/users";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import LoginForm, { LoginFormValues } from "../LoginForm";

export default function Page() {
  const router = useRouter();
  const { routes } = useApplicationData();

  const { mutate, isError, isLoading, isSuccess } = useMutation(
    ["postUserLogin"],
    async (values: LoginFormValues) => postUserLogin(values)
  );

  const handleSubmit = useCallback((values: LoginFormValues) => {
    mutate(values);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      redirect(routes.profile.path);
    }
  }, [isSuccess]);

  return (
    <FormModal open onClose={() => router.replace("homepage")} isDismissable>
      <LoginForm
        onSubmit={handleSubmit}
        mutateState={{
          isError,
          isLoading,
        }}
      />
    </FormModal>
  );
}
