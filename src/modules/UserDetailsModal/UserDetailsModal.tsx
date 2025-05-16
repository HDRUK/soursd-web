import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import FormModal from "../../components/FormModal";
import { Message } from "../../components/Message";
import useQueriesHistories from "../../queries/useQueriesHistories";
import { getUserQuery } from "../../services/users";
import { Organisation, User } from "../../types/application";
import ResearcherDetails from "../ResearcherDetails";

interface UserDetailsModalProps {
  isApproved: boolean;
  user: User;
  organisation: Organisation;
  open?: boolean;
  onClose(): void;
}

const NAMESPACE_TRANSLATIONS_DETAILS = "ResearcherDetails";

export default function UserDetailsModal({
  isApproved,
  user,
  organisation,
  open = true,
  onClose,
}: UserDetailsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_DETAILS);

  const {
    data: userDetails,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery(
    getUserQuery(user.id, {
      responseOptions: {
        error: {
          message: "getUserDetailsForCustodianError",
        },
      },
    })
  );

  const { data: histories, isLoading: isHistoriesLoading } =
    useQueriesHistories(user.registry_id);

  return (
    <FormModal
      aria-label={`${user.first_name} ${user.last_name} details`}
      variant="content"
      isLoading={isUserLoading || isHistoriesLoading}
      open={open}
      onClose={onClose}>
      {userError && <Message severity="error">{t(userError)}</Message>}
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
