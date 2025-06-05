import FormActions from "@/components/FormActions";
import ButtonSave from "@/components/ButtonSave";
import FormModal from "@/components/FormModal";
import { Checkbox, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
// import { Veriff } from "@veriff/js-sdk";
// import { createVeriffFrame } from "@veriff/incontext-sdk";

import FormModalBody from "@/components/FormModalBody";

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
  const [agreed, setAgreed] = useState(false);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  // const veriffRef = useRef<any>(null);
  /*
  useEffect(() => {
    if (!open) return;

    // Only initialize once
    if (!veriffRef.current) {
      veriffRef.current = Veriff({
        apiKey: "API_KEY", // Replace with real API key
        parentId: "veriff-root",
        onSession(err, response) {
          if (err) {
            console.error("Veriff session error:", err);
            return;
          }

          // Redirect or embed iframe
          window.location.href = response.verification.url;

          // Optional: embed via iframe
          // createVeriffFrame({ url: response.verification.url });
        },
      });

      veriffRef.current.mount();
    }
  }, [open]);

  const handleStartVerification = () => {
    if (!veriffRef.current) return;

    veriffRef.current.setParameters({}); // Optional: set additional parameters
    veriffRef.current.createSession();
  };

  */
  return (
    <FormModal open={open} onClose={onClose} title={t("title")}>
      <FormModalBody>
        <Typography>{t("description")}</Typography>
        <Checkbox
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
        />
        {t("agreeText")}
        <div id="veriff-root" />
      </FormModalBody>
      <FormActions>
        <Button onClick={onClose}>{tForm("cancel")}</Button>
        <ButtonSave disabled={!agreed} onClick={handleStartVerification}>
          {t("startVerification")}
        </ButtonSave>
      </FormActions>
    </FormModal>
  );
}
/*
function VeriffTermsAndConditions2({
  open,
  onClose,
}: VeriffTermsAndConditionsProps) {
  const veriff = Veriff({
    apiKey: "API_KEY",
    parentId: "veriff-root",
    onSession(err, response) {
      // received the response, verification can be started / triggered now

      // redirect
      window.location.href = response.verification.url;

      // incontext sdk
      createVeriffFrame({ url: response.verification.url });
    },
  });

  veriff.mount();

  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const [value, setValue] = useState(false);

  const handleSave = () => {
    // something needs to happen here
    // - no BE in place so will come in another ticket
    onClose();
  };

  return (
    <FormModal
      heading={t("title")}
      aria-label="verriff_terms_and_conditions_modal"
      variant="content"
      open={open}
      onClose={onClose}>
      <FormModalBody>
        <Typography>
          {t.rich("descriptionPart1", {
            ourLink: chunks => (
              <a target="_blank" href="#">
                {chunks}
              </a>
            ),
          })}
        </Typography>

        <Typography>
          {t.rich("descriptionPart2", {
            theirLink: chunks => (
              <a target="_blank" href="#">
                {chunks}
              </a>
            ),
          })}
        </Typography>

        <Checkbox value={value} onChange={e => setValue(e.target.checked)} />
        {t("checkboxLabel")}
      </FormModalBody>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          {tForm("cancelButton")}
        </Button>
        <ButtonSave onClick={handleSave} disabled={false} />
      </FormActions>
    </FormModal>
  );
}
*/
