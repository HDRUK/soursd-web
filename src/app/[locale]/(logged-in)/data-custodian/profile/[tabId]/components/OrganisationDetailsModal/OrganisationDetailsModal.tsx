import FormModal from "@/components/FormModal";
import { Organisation, getOrganisation } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import OrganisationDetails from "@/modules/OrganisationDetails/OrganisationDetails";
import { Message } from "@/components/Message";
import { useTranslations } from "next-intl";

interface OrganisationDetailsModalProps {
  isApproved: boolean;
  organisation: Organisation;
  open?: boolean;
  onClose(): void;
}

const NAMESPACE_TRANSLATIONS_DETAILS = "OrganisationDetails";

export default function OrganisationDetailsModal({
  organisation,
  isApproved,
  open = true,
  onClose,
}: OrganisationDetailsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_DETAILS);

  const {
    data: organisationData,
    isLoading,
    error: organisationError,
  } = useQuery({
    queryKey: ["getOrganisationDetailsForCustodian", organisation?.id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getOrganisation(id, {
        error: {
          message: "getOrganisationDetailsForCustodianError",
        },
      });
    },
  });

  return (
    <FormModal
      aria-label={`${organisation.organisation_name} details`}
      variant="content"
      isLoading={isLoading}
      open={open}
      onClose={onClose}>
      {organisationError && (
        <Message severity="error">{t(organisationError)}</Message>
      )}
      {!isLoading && organisationData?.data && (
        <OrganisationDetails
          isApproved={isApproved}
          data={organisationData?.data}
        />
      )}
    </FormModal>
  );
}
