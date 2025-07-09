import { ActionMenuItem } from "@/components/ActionMenu";
import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import { EditIcon } from "@/consts/icons";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { putUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import EditDelegateForm, { DelegatesFormValues } from "./EditDelegateForm";

export interface EditDelegateProps {
  user: User;
  onSuccess: () => void;
}

const EditDelegate = ({ user, onSuccess }: EditDelegateProps) => {
  const t = useTranslations("EditDelegate");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutateAsync: mutateDelegate, ...restMutateState } = useMutation(
    putUserQuery(user?.id as number)
  );

  const handleSubmit = async (fields: DelegatesFormValues) => {
    await mutateDelegate(fields);
  };

  useQueryAlerts(restMutateState, {
    onSuccess: () => {
      setOpenModal(false);

      onSuccess();
    },
    successAlertProps: {
      text: t("successAlertText"),
    },
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        t.rich("errorAlertText", {
          contactLink: ContactLink,
        })
      ),
    },
  });

  const { first_name, last_name, departments } = user;

  return (
    <>
      <ActionMenuItem
        sx={{ color: "secondary.main" }}
        onClick={() => setOpenModal(true)}
        icon={<EditIcon />}>
        {t("title")}
      </ActionMenuItem>
      <FormModal
        variant="form"
        open={openModal}
        onClose={(e: React.SyntheticEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenModal(false);
        }}>
        <EditDelegateForm
          defaultValues={{
            first_name,
            last_name,
            department_id: departments?.[0].id,
          }}
          onSubmit={handleSubmit}
          onClose={() => setOpenModal(false)}
          mutateState={restMutateState}
        />
      </FormModal>
    </>
  );
};

export default EditDelegate;
