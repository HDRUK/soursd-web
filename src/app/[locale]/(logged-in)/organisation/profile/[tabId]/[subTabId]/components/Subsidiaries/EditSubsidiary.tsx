import { EditIcon } from "@/consts/icons";
import { Organisation, Subsidiary } from "@/types/application";
import { useTranslations } from "next-intl";
import { useStore } from "@/data/store";
import ModalFormButton from "@/components/ModalFormButton";
import SubsidiaryForm, { SubsidiaryFormValues } from "./SubsidiaryForm";

interface RemoveSubsidiaryProps {
  subsidiary: Subsidiary;
  onSubmit: (fields: Partial<Organisation>) => void;
  isLoading?: boolean;
}

const NAMESPACE_TRANSLATIONS = "ProfileOrganisation";

const EditSubsidiary = ({
  subsidiary,
  onSubmit,
  isLoading = false,
}: RemoveSubsidiaryProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const organisation = useStore(state => state.getOrganisation());

  const handleUpdateSubsidiary = async (formData: SubsidiaryFormValues) => {
    if (!organisation?.subsidiaries) return null;

    const updatedSubsidiaries = organisation.subsidiaries.map(sub =>
      sub.id === subsidiary.id
        ? { name: formData.subsidiary_name, ...formData.subsidiary_address }
        : sub
    );

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

    return onSubmit(payload);
  };

  const renderFormContent = (closeModal: () => void, isLoading?: boolean) => (
    <SubsidiaryForm
      defaultValues={subsidiary}
      isLoading={isLoading}
      onSubmit={data => {
        handleUpdateSubsidiary(data).then(() => closeModal());
      }}
    />
  );

  return (
    <ModalFormButton
      icon={<EditIcon />}
      tooltipText={t("editSubsidiaryToolTip")}
      isLoading={isLoading}
      formContent={({ closeModal, isLoading }) =>
        renderFormContent(closeModal, isLoading)
      }
    />
  );
};

export default EditSubsidiary;
