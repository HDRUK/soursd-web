import FormModal from "@/components/FormModal";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState, QueryState } from "@/types/form";
import ProfessionalRegistrationsForm from "../ProfessionalRegistrationsForm";

interface ProfessionalRegistrationsFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    fields: PostProfessionalRegistrationPayload &
      ResearcherProfessionalRegistration
  ) => Promise<void>;
  queryState: QueryState | MutationState;
  initialValues?: ResearcherProfessionalRegistration;
  isEdit: boolean;
}

export default function ProfessionalRegistrationsFormModal({
  open,
  onSubmit,
  onClose,
  queryState,
  initialValues,
  isEdit,
}: ProfessionalRegistrationsFormModalProps) {
  return (
    <FormModal
      open={open}
      title={
        isEdit
          ? "Edit Professional Registration"
          : "Add Professional Registration"
      }>
      <ProfessionalRegistrationsForm
        onClose={onClose}
        onSubmit={onSubmit}
        queryState={queryState}
        data={initialValues}
        isEdit={isEdit}
      />
    </FormModal>
  );
}
