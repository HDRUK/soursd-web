import {
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_ISO_CERTIFICATION_NUMBER,
  VALIDATION_DSPTK_CERTIFICATION_NUMBER,
} from "@/consts/form";
import yup from "@/config/yup";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormConfig } from "@/types/forms";
import FormFieldArray from "@/components/FormFieldArray";

const generateSubsidiariesFormFieldsConfig = (
  t: (key: string) => string
): FormConfig => [
  {
    sectionTitle: t("organisationSubsidiaries.title"),
    sectionBoxSx: {
      mb: 4,
      display: "flex",
    },
    fields: [
      {
        name: "subsidiaries",
        formControlProps: {
          labelMd: 0,
          contentMd: 12,
        },
        component: FormFieldArray,
        validation: yup.array().of(
          yup.object().shape({
            subsidiary_name: yup
              .string()
              .transform(value => (value === "" ? null : value))
              .nullable()
              .min(3, t("organisationSubsidiaries.nameInvalid")),
            subsidiary_website: yup
              .string()
              .url(t("organisationSubsidiaries.websiteInvalid")),
          })
        ),
        componentProps: {
          removeButtonLabel: t("organisationSubsidiaries.removeButton"),
          addButtonLabel: t("organisationSubsidiaries.addButton"),
          fields: [
            {
              name: "subsidiary_name",
              label: t("organisationSubsidiaries.name"),
              component: TextField,
              componentProps: {
                variant: "outlined",
              } as TextFieldProps,
              formControlProps: {
                labelMd: 4,
                contentMd: 8,
              },
            },
            {
              name: "subsidiary_website",
              label: t("organisationSubsidiaries.website"),
              component: TextField,
              componentProps: {
                variant: "outlined",
              } as TextFieldProps,
              formControlProps: {
                labelMd: 4,
                contentMd: 8,
              },
            },
          ],
        },
      },
    ],
  },
  {
    sectionTitle: t("organisationDataSecurityCompliance.title"),
    sectionBoxSx: {
      mb: 4,
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 1,
    },
    fields: [
      {
        name: "ce_certification",
        label: t("organisationDataSecurityCompliance.ceCertification"),
        component: Checkbox,
        componentProps: {} as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
        defaultValue: false,
        validation: yup.boolean(),
      },
      {
        name: "ce_certification_num",
        label: t("organisationDataSecurityCompliance.ceCertificationNum"),
        component: TextField,
        componentProps: {
          variant: "outlined",
          placeholder: t(
            "organisationDataSecurityCompliance.ceCertificationNumPlaceholder"
          ),
        } as TextFieldProps,
        validation: yup.string().when("ce_certification", {
          is: true,
          then: () =>
            yup
              .string()
              .matches(
                VALIDATION_CE_CERTIFICATION_NUMBER,
                t(
                  "organisationDataSecurityCompliance.ceCertificationNumberInvalid"
                )
              )
              .required(
                t(
                  "organisationDataSecurityCompliance.ceCertificationNumberInvalid"
                )
              ),
          otherwise: () => yup.string().notRequired(),
        }),
        defaultValue: "",
      },
      {
        name: "ce_plus_certification",
        label: t("organisationDataSecurityCompliance.cePlusCertification"),
        component: Checkbox,
        componentProps: {} as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
        defaultValue: false,
        validation: yup.boolean(),
      },
      {
        name: "ce_plus_certification_num",
        label: t("organisationDataSecurityCompliance.cePlusCertificationNum"),
        component: TextField,
        componentProps: {
          variant: "outlined",
          placeholder: t(
            "organisationDataSecurityCompliance.cePlusCertificationNumPlaceholder"
          ),
        } as TextFieldProps,
        validation: yup.string().when("ce_plus_certification", {
          is: true,
          then: () =>
            yup
              .string()
              .matches(
                VALIDATION_CE_CERTIFICATION_NUMBER,
                t(
                  "organisationDataSecurityCompliance.cePlusCertificationNumberInvalid"
                )
              )
              .required(
                t(
                  "organisationDataSecurityCompliance.cePlusCertificationNumberInvalid"
                )
              ),
          otherwise: () => yup.string().notRequired(),
        }),
        defaultValue: "",
      },
      {
        name: "iso_27001_certified",
        label: t("organisationDataSecurityCompliance.iso270001Certification"),
        component: Checkbox,
        componentProps: {} as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
        defaultValue: false,
        validation: yup.boolean(),
      },
      {
        name: "iso_27001_certified_num",
        label: t(
          "organisationDataSecurityCompliance.iso270001CertificationNum"
        ),
        component: TextField,
        componentProps: {
          variant: "outlined",
          placeholder: t(
            "organisationDataSecurityCompliance.iso270001CertificationNumPlaceholder"
          ),
        } as TextFieldProps,
        validation: yup.string().when("iso_27001_certified", {
          is: true,
          then: () =>
            yup
              .string()
              .matches(
                VALIDATION_ISO_CERTIFICATION_NUMBER,
                t(
                  "organisationDataSecurityCompliance.iso270001CertificationNumInvalid"
                )
              ),
          otherwise: () => yup.string().notRequired(),
        }),
        defaultValue: "",
      },
      {
        name: "dsptk_certified",
        label: t("organisationDataSecurityCompliance.dsptkCertification"),
        component: Checkbox,
        componentProps: {} as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
        defaultValue: false,
        validation: yup.boolean(),
      },
      {
        name: "dsptk_certified_num",
        label: t("organisationDataSecurityCompliance.dsptkCertificationNum"),
        component: TextField,
        componentProps: {
          variant: "outlined",
          placeholder: t(
            "organisationDataSecurityCompliance.dsptkCertificationNumPlaceholder"
          ),
        } as TextFieldProps,
        validation: yup.string().when("dsptk_certified", {
          is: true,
          then: () =>
            yup
              .string()
              .matches(
                VALIDATION_DSPTK_CERTIFICATION_NUMBER,
                t(
                  "organisationDataSecurityCompliance.dsptkCertificationNumInvalid"
                )
              ),
          otherwise: () => yup.string().notRequired(),
        }),
        defaultValue: "",
      },
    ],
  },
];

export { generateSubsidiariesFormFieldsConfig };
