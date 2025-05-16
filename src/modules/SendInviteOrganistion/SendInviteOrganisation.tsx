import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";
import useOrganisationInvite from "../../queries/useOrganisationInvite";
import { showAlert } from "../../utils/showAlert";
import ContactLink from "../../components/ContactLink";
import InviteOrganisation from "../InviteOrganisation";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";

interface SendInviteOrganisationProps {
  organisationId?: number;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function SendInviteOrganisation({
  organisationId,
  onSuccess,
  onClose,
}: SendInviteOrganisationProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    onClose?.();
    showAlert("error", {
      text: ReactDOMServer.renderToString(
        t.rich("inviteOrganisationError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: t("inviteOrganisationErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    onSuccess?.();
    onClose?.();
    showAlert("success", {
      text: t("inviteOrganisationSuccess"),
      confirmButtonText: t("inviteOrganisationSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useOrganisationInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return (
    <InviteOrganisation
      organisationId={organisationId}
      onSubmit={handleSubmit}
      queryState={queryState}
    />
  );
}
