import { useTranslations } from "next-intl";
import SendInviteUser from "@/modules/SendInviteUser";
import FormModal, { FormModalProps } from "../FormModal";

interface InviteUserProps extends Omit<FormModalProps, "children"> {}

const NAMESPACE_TRANSLATION = "CustodianInviteUser";

export default function CustodianInviteUser({ ...restProps }: InviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  return (
    <FormModal variant="content" description={t("description")} {...restProps}>
      <SendInviteUser forceSelectOrganisation={true} />
    </FormModal>
  );
}
