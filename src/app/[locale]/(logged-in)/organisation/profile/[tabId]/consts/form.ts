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
import GoogleAutocomplete from "@/components/GoogleAutocomplete";

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
      flexDirection: "column",
      width: "100%",
      gap: 2,
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
            name: yup
              .string()
              .transform(value => (value === "" ? null : value))
              .when("address", {
                is: address => Boolean(address),
                otherwise: schema => schema.nullable(),
                then: schema =>
                  schema
                    .required(t("organisationSubsidiaries.nameInvalid"))
                    .min(3, t("organisationSubsidiaries.nameInvalid")),
              }),
          })
        ),
        componentProps: {
          boxSx: {
            display: "grid",
            gridTemplateColumns: "2fr 3fr 1fr",
          },
          removeButtonLabel: t("organisationSubsidiaries.removeButton"),
          addButtonLabel: t("organisationSubsidiaries.addButton"),
          fields: [
            {
              name: "name",
              label: t("organisationSubsidiaries.name"),
              defaultValues: organisation?.subsidiaries?.map(s => s.name),
              component: TextField,
              componentProps: {
                variant: "outlined",
                inputProps: {
                  "aria-label": t("organisationSubsidiaries.name"),
                },
              } as TextFieldProps,
              formControlProps: {
                labelMd: 2,
                contentMd: 10,
              },
            },
            {
              name: "address",
              label: t("organisationSubsidiaries.address"),
              defaultValues: organisation?.subsidiaries?.map(
                ({
                  address_1,
                  address_2,
                  country,
                  county,
                  postcode,
                  town,
                }) => ({
                  address_1,
                  address_2,
                  country,
                  county,
                  postcode,
                  town,
                })
              ),
              component: GoogleAutocomplete,
              componentProps: {
                textFieldProps: { variant: "filled", size: "small" },
                fullWidth: true,
                placeholder: t("organisationSubsidiaries.addressPlaceholder"),
              },
              formControlProps: {
                labelMd: 2,
                contentMd: 10,
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

export { generateSubsidiariesFormFieldsConfig };
