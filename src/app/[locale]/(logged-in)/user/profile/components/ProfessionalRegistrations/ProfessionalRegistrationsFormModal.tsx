import React from "react";
import FormModal from "@/components/FormModal";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { UseQueryResult } from "@tanstack/react-query";
import ProfessionalRegistrationsForm from "../ProfessionalRegistrationsForm";

interface ProfessionalRegistrationsFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fields: PostProfessionalRegistrationPayload) => Promise<void>;
  queryState: UseQueryResult;
}

export default function ProfessionalRegistrationsFormModal({
  open,
  onSubmit,
  onClose,
  queryState,
}: ProfessionalRegistrationsFormModalProps) {
  return (
    <FormModal open={open} title="Add Professional Registration">
      <ProfessionalRegistrationsForm
        onClose={onClose}
        onSubmit={onSubmit}
        queryState={queryState}
      />
    </FormModal>
  );
}
