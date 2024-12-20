import { VALIDATION_CE_CERTIFICATION_NUMBER } from "@/consts/form";
import yup from "@/config/yup";
// import FormControlCheckbox from "@/components/FormControlCheckbox";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormConfig } from "@/utils/yup";

const generateSubsidiariesFormFieldsConfig = (
  t: (key: string) => string
): FormConfig => [
  {
    name: "ce_certification",
    label: t("ceCertification"),
    component: Checkbox,
    componentProps: {} as CheckboxProps,
    defaultValue: false,
    validation: yup.boolean(),
  },
  {
    name: "ce_certification_num",
    label: t("ceCertificationNum"),
    component: TextField,
    componentProps: {
      variant: "outlined",
      placeholder: t("ceCertificationNumPlaceholder"),
    } as TextFieldProps,
    validation: yup
      .string()
      .matches(
        VALIDATION_CE_CERTIFICATION_NUMBER,
        "ceCertificationNumberInvalid"
      ),
    defaultValue: "",
  },
];

export { generateSubsidiariesFormFieldsConfig };
