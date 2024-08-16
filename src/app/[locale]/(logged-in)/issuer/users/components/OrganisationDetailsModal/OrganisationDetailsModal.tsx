import FormModal from "@/components/FormModal";
import { Organisation, getOrganisation } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import OrganisationDetails from "@/modules/OrganisationDetails/OrganisationDetails";

interface OrganisationDetailsModalProps {
  isApproved: boolean;
  organisation: Organisation;
  open?: boolean;
  onClose(): void;
}

export default function OrganisationDetailsModal({
  organisation,
  isApproved,
  open = true,
  onClose,
}: OrganisationDetailsModalProps) {
  const { data: organisationData, isLoading } = useQuery({
    queryKey: ["getOrganisationDetailsForIssuer", organisation?.id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getOrganisation(id, {
        error: {
          message: "getOrganisationDetailsForIssuerError",
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
      {!isLoading && organisationData?.data && (
        <OrganisationDetails
          isApproved={isApproved}
          data={organisationData?.data}
        />
      )}
    </FormModal>
  );
}
