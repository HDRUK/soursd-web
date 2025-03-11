import React from "react";
import FormModal from "@/components/FormModal";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { UseQueryResult } from "@tanstack/react-query";
import ProfessionalRegistrationsForm from "../ProfessionalRegistrationsForm";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState, QueryState } from "@/types/form";

interface ProfessionalRegistrationsFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    fields: PostProfessionalRegistrationPayload &
      ResearcherProfessionalRegistration
  ) => Promise<void>;
  queryState: QueryState | MutationState;
  data?: ResearcherProfessionalRegistration;
}

export default function ProfessionalRegistrationsFormModal({
  open,
  onSubmit,
  onClose,
  queryState,
  data,
}: ProfessionalRegistrationsFormModalProps) {
  return (
    <FormModal open={open} title="Add Professional Registration">
      <ProfessionalRegistrationsForm
        onClose={onClose}
        onSubmit={onSubmit}
        queryState={queryState}
        data={data}
      />
    </FormModal>
  );
}
