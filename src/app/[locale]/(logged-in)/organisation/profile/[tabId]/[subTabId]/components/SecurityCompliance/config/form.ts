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
  ce_certification_num?: string;
  ce_expiry_date?: Date;
  ce_plus_certification_num?: string;
  ce_plus_expiry_date?: Date;
  iso_27001_certification_num?: string;
  iso_expiry_date?: Date;
  dsptk_ods_code?: string;
  dsptk_expiry_date?: Date;
}

export const getValidation = (t: (key: string) => string) =>
  yup.object<FormData>({
    ce_certification_num: yup
      .string()
      .optional()
      .matches(VALIDATION_CE_CERTIFICATION_NUMBER, {
        message: t("ceCertificationNumberInvalid"),
        excludeEmptyString: true,
      }),
    ce_expiry_date: yup
      .date()
      .nullable()
      .when("ce_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("ceExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),

    ce_plus_certification_num: yup
      .string()
      .optional()
      .matches(VALIDATION_CE_CERTIFICATION_NUMBER, {
        message: t("cePlusCertificationNumberInvalid"),
        excludeEmptyString: true,
      }),
    ce_plus_expiry_date: yup
      .date()
      .nullable()
      .when("ce_plus_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("cePlusExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),

    iso_27001_certification_num: yup
      .string()
      .optional()
      .matches(VALIDATION_ISO_CERTIFICATION_NUMBER, {
        message: t("iso27001CertificationNumInvalid"),
        excludeEmptyString: true,
      }),
    iso_expiry_date: yup
      .date()
      .nullable()
      .when("iso_27001_certification_num", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("isoExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),

    dsptk_ods_code: yup
      .string()
      .optional()
      .matches(VALIDATION_DSPTK_CERTIFICATION_NUMBER, {
        message: t("dsptkOdsCodeInvalid"),
        excludeEmptyString: true,
      }),
    dsptk_expiry_date: yup
      .date()
      .nullable()
      .when("dsptk_ods_code", {
        is: (value: string) => !!value,
        then: schema => schema.required(t("dsptkExpiryDateRequired")),
        otherwise: schema => schema.notRequired(),
      }),
  });

export const getDefaultValues = (organisation?: Organisation): FormData => ({
  ce_certification_num: organisation?.ce_certification_num || "",
  ce_expiry_date: organisation?.ce_expiry_date,
  ce_plus_certification_num: organisation?.ce_plus_certification_num || "",
  ce_plus_expiry_date: organisation?.ce_plus_expiry_date,
  iso_27001_certification_num: organisation?.iso_27001_certification_num || "",
  iso_expiry_date: organisation?.iso_expiry_date,
  dsptk_ods_code: organisation?.dsptk_ods_code || "",
  dsptk_expiry_date: organisation?.dsptk_expiry_date,
});

type Certification = {
  certificationNum: keyof FormData;
  certificationExpiryDate: keyof FormData;
};

export const certificationRows: Certification[] = [
  {
    certificationNum: "ce_certification_num",
    certificationExpiryDate: "ce_expiry_date",
  },
  {
    certificationNum: "ce_plus_certification_num",
    certificationExpiryDate: "ce_plus_expiry_date",
  },
  {
    certificationNum: "iso_27001_certification_num",
    certificationExpiryDate: "iso_expiry_date",
  },
  {
    certificationNum: "dsptk_ods_code",
    certificationExpiryDate: "dsptk_expiry_date",
  },
];
