import { DecoupleIcon } from "@/consts/icons";
import { Tooltip, IconButton } from "@mui/material";
import { patchUser } from "@/services/users";
import { PatchUserPayload } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { showAlert, showLoadingAlertWithPromise } from "@/utils/showAlert";
import { User } from "@/types/application";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";

const NAMESPACE_TRANSLATION_DECOUPLEUSER = "DecoupleUser";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
}

const DecoupleUser = ({ user, onSuccess }: DecoupleUserProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_DECOUPLEUSER);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, isError, isPending, error } = useMutation({
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

  const handleDecoupleUser = async () => {
    showAlert("warning", {
      text: t("alertText", {
        first_name,
        last_name,
        organisation_name,
      }),
      title: t("alertTitle"),
      confirmButtonText: t("alertConfirm"),
      cancelButtonText: t("alertCancel"),
      closeOnConfirm: true,
      closeOnCancel: true,
      preConfirm: () => {
        showLoadingAlertWithPromise(mutateAsync({ organisation_id: null }), {
          onSuccess,
        });
      },
    });
  };

  return (
    <Tooltip title={"up the ra"}>
      <IconButton
        onClick={handleDecoupleUser}
        size="small"
        color="inherit"
        aria-label="icon-button">
        <DecoupleIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DecoupleUser;
