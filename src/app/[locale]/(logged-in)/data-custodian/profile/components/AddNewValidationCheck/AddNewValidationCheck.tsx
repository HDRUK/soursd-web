import { useState } from "react";
import { useTranslations } from "next-intl";
import { Rule } from "@/types/rules";
import { Button } from "@mui/material";
import AddEditCheckboxItem from "@/components/AddEditCheckboxItem";

const NAMESPACE_TRANSLATION = "ValidationChecks";

interface AddNewCheckProps {
  title: string;
  onSubmit: (data: Rule) => Promise<void>;
}
const AddNewValidationCheck = ({ title, onSubmit }: AddNewCheckProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="outlined">
        {t("addUserValidationCheck")}
      </Button>
      <AddEditCheckboxItem
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={onSubmit}
        title={title}
      />
    </>
  );
};

export default AddNewValidationCheck;
