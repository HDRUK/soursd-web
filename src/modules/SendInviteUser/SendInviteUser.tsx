import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";
import ContactLink from "../../components/ContactLink";
import InviteUser from "../InviteUser";
import useUserInvite from "../../queries/useUserInvite";
import { showAlert } from "../../utils/showAlert";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "User";

interface SendInviteUserProps {
  organisationId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function SendInviteUser({
  organisationId,
  onSuccess,
  onError,
}: SendInviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert("error", {
      text: ReactDOMServer.renderToString(
        t.rich("inviteUserError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: t("inviteUserErrorButton"),
      willClose: () => onError?.(),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteUserSuccess"),
      confirmButtonText: t("inviteUserSuccessButton"),
      willClose: () => onSuccess?.(),
    });
  };

  const { queryState, handleSubmit } = useUserInvite({
    organisationId,
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteUser onSubmit={handleSubmit} queryState={queryState} />;
}
