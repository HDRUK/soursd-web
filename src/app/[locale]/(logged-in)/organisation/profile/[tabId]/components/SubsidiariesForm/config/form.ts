import {
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_ISO_CERTIFICATION_NUMBER,
  VALIDATION_DSPTK_CERTIFICATION_NUMBER,
} from "@/consts/form";
import yup from "@/config/yup";
import { AddressFields, Organisation } from "@/types/application";

export interface SubsidiariesFormData {
  name: string;
  address?: AddressFields;
}

export interface FormData {
  subsidiaries?: SubsidiariesFormData[];
  ce_certified?: boolean;
  ce_certification_num?: string;
  ce_plus_certified?: boolean;
  ce_plus_certification_num?: string;
  iso_27001_certified?: boolean;
  iso_27001_certification_num?: string;
  dsptk_certified?: boolean;
  dsptk_certification_num?: string;
}

export const getValidation = (t: (key: string) => string) =>
  yup.object<FormData>({
    subsidiaries: yup.array().of(
      yup.object().shape({
        name: yup.string().when("address", {
          is: (address: AddressFields) => Boolean(address),
          otherwise: schema => schema.nullable(),
          then: schema => schema.required(t("nameInvalid")),
        }),
        address: yup.object().shape({
          postcode: yup.string().nullable(),
          address_1: yup.string().nullable(),
          address_2: yup.string().nullable(),
          town: yup.string().nullable(),
          county: yup.string().nullable(),
          country: yup.string().nullable(),
        }),
      })
    ),
    ce_certified: yup.boolean(),
    ce_certification_num: yup.string().when("ce_certified", {
      is: true,
      then: () =>
        yup
          .string()
          .matches(
            VALIDATION_CE_CERTIFICATION_NUMBER,
            t("ceCertificationNumberInvalid")
          )
          .required(t("ceCertificationNumberInvalid")),
      otherwise: () => yup.string().notRequired(),
    }),

    ce_plus_certified: yup.boolean(),
    ce_plus_certification_num: yup.string().when("ce_plus_certified", {
      is: true,
      then: () =>
        yup
          .string()
          .matches(
            VALIDATION_CE_CERTIFICATION_NUMBER,
            t("cePlusCertificationNumberInvalid")
          )
          .required(t("cePlusCertificationNumberInvalid")),
      otherwise: () => yup.string().notRequired(),
    }),
    iso_27001_certified: yup.boolean(),
    iso_27001_certification_num: yup.string().when("iso_27001_certified", {
      is: true,
      then: () =>
        yup
          .string()
          .matches(
            VALIDATION_ISO_CERTIFICATION_NUMBER,
            t("iso27001CertificationNumInvalid")
          ),
      otherwise: () => yup.string().notRequired(),
    }),
    dsptk_certified: yup.boolean(),
    dsptk_certification_num: yup.string().when("dsptk_certified", {
      is: true,
      then: () =>
        yup
          .string()
          .matches(
            VALIDATION_DSPTK_CERTIFICATION_NUMBER,
            t("dsptkCertificationNumInvalid")
          ),
      otherwise: () => yup.string().notRequired(),
    }),
  });

export const getDefaultValues = (organisation?: Organisation): FormData => ({
  subsidiaries:
    organisation?.subsidiaries?.map(
      ({ id: _id, pivot: _pivot, name, ...rest }) => ({
        name,
        address: rest,
      })
    ) || [],
  ce_certified: organisation?.ce_certified,
  ce_certification_num: organisation?.ce_certification_num || "",
  ce_plus_certified: organisation?.ce_plus_certified,
  ce_plus_certification_num: organisation?.ce_plus_certification_num || "",
  iso_27001_certified: organisation?.iso_27001_certified,
  iso_27001_certification_num: organisation?.iso_27001_certification_num || "",
  dsptk_certified: organisation?.dsptk_certified,
  dsptk_certification_num: organisation?.dsptk_certification_num || "",
});

type Certification = {
  certified: keyof FormData;
  certificationNum: keyof FormData;
};

export const certificationRows: Certification[] = [
  {
    certified: "ce_certified",
    certificationNum: "ce_certification_num",
  },
  {
    certified: "ce_plus_certified",
    certificationNum: "ce_plus_certification_num",
  },
  {
    certified: "iso_27001_certified",
    certificationNum: "iso_27001_certification_num",
  },
  {
    certified: "dsptk_certified",
    certificationNum: "dsptk_certification_num",
  },
];
