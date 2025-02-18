import { EditIcon } from "@/consts/icons";
import { Tooltip, IconButton } from "@mui/material";
import { PatchUserPayload, patchUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";

import { User } from "@/types/application";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import InvitedDelegatesForm from "../InvitedDelegatesForm";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
  payload: PatchUserPayload;
}

const EditDelegate = ({ user, onSuccess, payload }: DecoupleUserProps) => {
  const t = useTranslations("EditDelegate");
  const organisation = useStore(state => state.config.organisation);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutateAsync } = useMutation({
    mutationKey: ["patchUser"],
    mutationFn: (payload: PatchUserPayload) =>
      patchUser(user.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const { first_name, last_name } = user;
  const { organisation_name } = organisation || {};

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
        sx={{ backgroundColor: "red" }}
        open={openModal}
        onClose={() => setOpenModal(false)}>
        <InvitedDelegatesForm onSuccess={() => setOpenModal(false)} />
      </FormModal>
    </>
  );
};

export default EditDelegate;
