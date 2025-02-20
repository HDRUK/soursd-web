import { EditIcon } from "@/consts/icons";
import { Tooltip, IconButton } from "@mui/material";

import { User } from "@/types/application";
import { useTranslations } from "next-intl";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import EditDelegateForm from "./EditDelegateForm";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
}

const EditDelegate = ({ user, onSuccess }: DecoupleUserProps) => {
  const t = useTranslations("EditDelegate");

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Tooltip title={t("toolTip")}>
        <IconButton
          onClick={() => setOpenModal(true)}
          size="small"
          color="inherit"
          aria-label="icon-button">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <FormModal
        variant="form"
        open={openModal}
        onClose={() => setOpenModal(false)}>
        <EditDelegateForm
          delegate={user}
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
