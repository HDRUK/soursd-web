import FormActions from "@/components/FormActions";
import ButtonSave from "@/components/ButtonSave";
import FormModal from "@/components/FormModal";
import Markdown from "@/components/Markdown";
import { Checkbox, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface VeriffTermsAndConditionsProps {
  open: boolean;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "VeriffTermsAndConditions";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function VeriffTermsAndConditions({
  open,
  onClose,
}: VeriffTermsAndConditionsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const [value, setValue] = useState(false);

  const handleSave = () => {
    // something needs to happen?
    onClose();
  };

  return (
    <FormModal
      heading={t("title")}
      aria-label="verriff_terms_and_conditions_modal"
      variant="content"
      open={open}
      onClose={onClose}>
      <p>
        {t.rich("descriptionPart1", {
          ourLink: chunks => (
            <a target="_blank" href="#">
              {chunks}
            </a>
          ),
        })}
      </p>

      <p>
        {t.rich("descriptionPart2", {
          theirLink: chunks => (
            <a target="_blank" href="#">
              {chunks}
            </a>
          ),
        })}
      </p>

      <Checkbox value={value} onChange={e => setValue(e.target.checked)} />
      {t("checkboxLabel")}
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          {tForm("cancelButton")}
        </Button>
        <ButtonSave onClick={handleSave} disabled={false} />
      </FormActions>
    </FormModal>
  );
}
