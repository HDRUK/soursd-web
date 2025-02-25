import { TrashIcon } from "@/consts/icons";
import { Tooltip, IconButton } from "@mui/material";
import { PatchUserPayload, patchUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { showAlert, showLoadingAlertWithPromise } from "@/utils/showAlert";
import { User } from "@/types/application";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
  payload: PatchUserPayload;
  namespace: string;
}

const DecoupleDelegate = ({
  user,
  onSuccess,
  payload,
  namespace,
}: DecoupleUserProps) => {
  const t = useTranslations(namespace);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, ...queryState } = useMutation({
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

  const showConfirmAlert = useQueryConfirmAlerts(queryState, {
    confirmAlertProps: {
      title: t("alertTitle"),
      text: t("alertText", {
        first_name,
        last_name,
        organisation_name,
      }),
      confirmButtonText: t("alertConfirm"),
      cancelButtonText: t("alertCancel"),
      willClose: () => {
        showLoadingAlertWithPromise(mutateAsync(payload), {
          onSuccess,
        });
      },
    },
  });

  const handleDecoupleUser = async () => {
    showConfirmAlert();
  };

  return (
    <Tooltip title={t("toolTip")}>
      <IconButton
        onClick={handleDecoupleUser}
        size="small"
        color="inherit"
        aria-label="icon-button">
        <TrashIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DecoupleDelegate;
