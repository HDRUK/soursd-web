import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import { TrashIcon } from "../../consts/icons";
import { PatchUserPayload, patchUser } from "../../services/users";
import { showAlert, showLoadingAlertWithPromise } from "../../utils/showAlert";
import { User } from "../../types/application";
import { ActionMenuItem } from "../ActionMenu";

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
        showLoadingAlertWithPromise(mutateAsync(payload), {
          onSuccess,
        });
      },
    });
  };

  return (
    <ActionMenuItem
      sx={{ color: "error.main" }}
      onClick={handleDecoupleUser}
      icon={<TrashIcon />}>
      {t("title")}
    </ActionMenuItem>
  );
};

export default DecoupleDelegate;
