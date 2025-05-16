import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";
import useCustodianInvite from "../../queries/useCustodianInvite";
import { showAlert } from "../../utils/showAlert";
import ContactLink from "../../components/ContactLink";
import InviteCustodian from "../InviteCustodian";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Custodian";

export default function SendInviteOrganisation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert("error", {
      text: ReactDOMServer.renderToString(
        t.rich("inviteCustodianError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: t("inviteCustodianErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteCustodianSuccess"),
      confirmButtonText: t("inviteCustodianSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useCustodianInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteCustodian onSubmit={handleSubmit} queryState={queryState} />;
}
