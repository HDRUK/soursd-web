"use client";

import FormModal from "@/components/FormModal";
import SignupForm from "@/modules/SignupForm/SignupForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <FormModal open onClose={() => router.replace("homepage")} isDismissable>
      <SignupForm onSubmit={() => {}} />
    </FormModal>
  );
}
