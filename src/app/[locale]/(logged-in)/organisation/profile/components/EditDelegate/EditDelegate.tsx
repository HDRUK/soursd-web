import { EditIcon } from "@/consts/icons";
import { ActionMenuItem } from "@/components/ActionMenu";
import { User } from "@/types/application";
import { useTranslations } from "next-intl";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import EditDelegateForm from "./EditDelegateForm";

export interface EditDelegateProps {
  user: User;
  onSuccess: () => void;
}

const EditDelegate = ({ user, onSuccess }: EditDelegateProps) => {
  const t = useTranslations("EditDelegate");

  const [openModal, setOpenModal] = useState<boolean>(false);

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
          delegate={user}
          onCancel={() => {
            setOpenModal(false);
          }}
          onSuccess={() => {
            setOpenModal(false);
            onSuccess();
          }}
        />
      </FormModal>
    </>
  );
};

export default EditDelegate;
