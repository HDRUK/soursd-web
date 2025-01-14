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
import { Organisation } from "@/types/application";
import SelectInput from "@/components/SelectInput";
import { SelectInputProps } from "@/components/SelectInput/SelectInput";

const generateSubsidiariesFormFieldsConfig = (
  t: (key: string) => string,
  organisation?: Organisation
): FormConfig => [
  {
    sectionId: 1,
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
          displayLabel: false,
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
              .transform(value => (value === "" ? null : value))
              .nullable()
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
                inputProps: {
                  "aria-label": t("organisationSubsidiaries.name"),
                },
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
                inputProps: {
                  "aria-label": t("organisationSubsidiaries.website"),
                },
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
    sectionId: 2,
    sectionTitle: t("organisationDataSecurityCompliance.title"),
    sectionBoxSx: {
      mb: 4,
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 1,
    },
    fields: [
      {
        name: "ce_certified",
        label: t("organisationDataSecurityCompliance.ceCertification"),
        component: Checkbox,
        componentProps: {
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.ceCertification"
            ),
          },
          defaultChecked: organisation?.ce_certified,
        } as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
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
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.ceCertificationNum"
            ),
          },
        } as TextFieldProps,
        validation: yup.string().when("ce_certified", {
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
        defaultValue: organisation?.ce_certification_num || "",
      },
      {
        name: "ce_plus_certified",
        label: t("organisationDataSecurityCompliance.cePlusCertification"),
        component: Checkbox,
        componentProps: {
          defaultChecked: organisation?.ce_plus_certified,
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.cePlusCertification"
            ),
          },
        } as CheckboxProps,
        formControlProps: { labelMd: 7, contentMd: 5 },
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
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.cePlusCertificationNum"
            ),
          },
        } as TextFieldProps,
        validation: yup.string().when("ce_plus_certified", {
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
        defaultValue: organisation?.ce_plus_certification_num || "",
      },
      {
        name: "iso_27001_certified",
        label: t("organisationDataSecurityCompliance.iso270001Certification"),
        component: Checkbox,
        componentProps: {
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.iso270001Certification"
            ),
          },
        } as CheckboxProps,
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
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.iso270001CertificationNum"
            ),
          },
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
        componentProps: {
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.dsptkCertification"
            ),
          },
        } as CheckboxProps,
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
          inputProps: {
            "aria-label": t(
              "organisationDataSecurityCompliance.dsptkCertificationNum"
            ),
          },
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

const generateDelegatesFormFieldsConfig = (
  t: (key: string) => string,
  departments?: { label: string; value: string }[]
): FormConfig => [
  {
    sectionId: 1,
    sectionTitle: t("organisationDelegates.title"),
    sectionBoxSx: {
      mb: 4,
      display: "flex",
      flexDirection: "column",
    },
    fields: [
      {
        name: "delegates",
        formControlProps: {
          labelMd: 0,
          contentMd: 12,
          displayLabel: false,
        },
        component: FormFieldArray,
        validation: yup.array().of(
          yup.object().shape({
            department_name: yup
              .string()
              .required()
              .transform(value => (value === "" ? null : value)),
            delegate_full_name: yup
              .string()
              .required()
              .transform(value => (value === "" ? null : value)),
            delegate_job_title: yup
              .string()
              .required()
              .transform(value => (value === "" ? null : value)),
            delegate_email: yup
              .string()
              .transform(value => (value === "" ? null : value))
              .required(),
          })
        ),
        componentProps: {
          sx: { display: "flex", flexDirection: "column" },
          renderButtons: false,
          fields: [
            {
              name: "department_name",
              label: t("organisationDelegates.departmentName"),
              component: SelectInput,
              componentProps: {
                variant: "outlined",
                ariaLabel: t("organisationDelegates.departmentName"),
                options: departments,
              } as SelectInputProps,
              formControlProps: {
                labelMd: 4,
                contentMd: 8,
              },
            },
            {
              name: "delegate_full_name",
              label: t("organisationDelegates.delegateFullName"),
              component: TextField,
              componentProps: {
                variant: "outlined",
                inputProps: {
                  "aria-label": t("organisationDelegates.delegateFullName"),
                },
              } as TextFieldProps,
              formControlProps: {
                labelMd: 4,
                contentMd: 8,
              },
            },
            {
              name: "delegate_job_title",
              label: t("organisationDelegates.delegateJobTitle"),
              component: TextField,
              componentProps: {
                variant: "outlined",
                inputProps: {
                  "aria-label": t("organisationDelegates.delegateJobTitle"),
                },
              } as TextFieldProps,
              formControlProps: {
                labelMd: 4,
                contentMd: 8,
              },
            },
            {
              name: "delegate_email",
              label: t("organisationDelegates.delegateEmail"),
              component: TextField,
              componentProps: {
                variant: "outlined",
                inputProps: {
                  "aria-label": t("organisationDelegates.delegateEmail"),
                },
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
];

export {
  generateSubsidiariesFormFieldsConfig,
  generateDelegatesFormFieldsConfig,
};
