import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TrashIcon } from "../../consts/icons";
import { PutUserPayload, putUser } from "../../services/users";
import { Organisation, User } from "../../types/application";
import { showAlert, showLoadingAlertWithPromise } from "../../utils/showAlert";
import { ActionMenuItem } from "../ActionMenu";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
  payload: PutUserPayload;
  namespace: string;
  organisation: Organisation;
}

const DecoupleDelegate = ({
  user,
  onSuccess,
  payload,
  namespace,
  organisation,
}: DecoupleUserProps) => {
  const t = useTranslations(namespace);

  const { mutateAsync } = useMutation({
    mutationKey: ["putUser"],
    mutationFn: (payload: PutUserPayload) =>
      putUser(user.id, payload, {
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
