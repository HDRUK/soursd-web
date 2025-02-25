import { TrashIcon } from "@/consts/icons";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
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
    <Tooltip title={t("removeSubsidiaryToolTip")}>
      <IconButton
        disabled={isLoading}
        onClick={handleRemoveSubsidiary}
        size="small"
        color="inherit"
        aria-label="icon-button">
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <TrashIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default RemoveSubsidiary;
