import { TrashIcon } from "@/consts/icons";
import { Tooltip, IconButton } from "@mui/material";
import { PatchUserPayload, patchUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { showAlert, showLoadingAlertWithPromise } from "@/utils/showAlert";
import { Organisation, Subsidiary } from "@/types/application";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";

interface RemoveSubsidiaryProps {
  subsidiary: Subsidiary;
  onSubmit: (fields: Partial<Organisation>) => void;
  isLoading?: boolean;
}

const NAMESPACE_TRANSLATIONS = "ProfileOrganisation";

const RemoveSubsidiary = ({
  subsidiary,
  onSubmit,
  isLoading = false,
}: RemoveSubsidiaryProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const organisation = useStore(state => state.getOrganisation());

  /*const { mutateAsync } = useMutation({
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
  };*/

  const handleRemoveSubsidiary = () => {
    const updatedSubsidiaries =
      organisation?.subsidiaries?.filter(sub => sub.id !== subsidiary.id) || [];

    const payload = {
      subsidiaries: updatedSubsidiaries.map(
        ({ name, address_1, address_2, town, county, country, postcode }) => ({
          name,
          address: {
            address_1,
            address_2,
            town,
            county,
            country,
            postcode,
          },
        })
      ),
    };

    onSubmit(payload);
  };

  return (
    <Tooltip title={t("toolTip")}>
      <IconButton
        disabled={isLoading}
        onClick={handleRemoveSubsidiary}
        size="small"
        color="inherit"
        aria-label="icon-button">
        <TrashIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveSubsidiary;
