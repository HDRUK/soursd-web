import FormModal from "@/components/FormModal";
import useQueriesHistories from "@/queries/useQueriesHistories";
import { getUser } from "@/services/users";
import { Organisation, User } from "@/types/application";
import { useQuery } from "@tanstack/react-query";
import ResearcherDetails from "@/modules/ResearcherDetails";

interface UserDetailsModalProps {
  isApproved: boolean;
  user: User;
  organisation: Organisation;
  open?: boolean;
  onClose(): void;
}

export default function ResearcherDetailsModal({
  isApproved,
  user,
  organisation,
  open = true,
  onClose,
}: UserDetailsModalProps) {
  const { data: userDetails, isLoading: isUserLoading } = useQuery({
    queryKey: ["getUserDetailsForIssuer", user?.id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getUser(id, {
        error: {
          message: "getUserDetailsForIssuerError",
        },
      });
    },
  });

  const { data: histories, isLoading: isHistoriesLoading } =
    useQueriesHistories(user.registry_id);

  return (
    <FormModal
      variant="content"
      isLoading={isUserLoading || isHistoriesLoading}
      open={open}
      onClose={onClose}>
      {!isUserLoading &&
        !isHistoriesLoading &&
        userDetails?.data &&
        histories && (
          <ResearcherDetails
            isApproved={isApproved}
            organisation={organisation}
            user={userDetails?.data}
            histories={histories}
          />
        )}
    </FormModal>
  );
}
