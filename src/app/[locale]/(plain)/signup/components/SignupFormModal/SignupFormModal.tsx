"use client";

import FormModal from "@/components/FormModal";
import { useRouter } from "next/navigation";
import SignupForm from "../SignupForm";

export default function Page() {
  const router = useRouter();

  return (
    <FormModal open onClose={() => router.replace("homepage")} isDismissable>
      <SignupForm onSubmit={() => {}} />
    </FormModal>
  );
}
