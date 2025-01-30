import yup from "@/config/yup";
import { AddressFields, Organisation } from "@/types/application";

export interface SubsidiariesFormData {
  name: string;
  address?: AddressFields;
}

export interface FormData {
  subsidiaries?: SubsidiariesFormData[];
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
  });

export const getDefaultValues = (organisation?: Organisation): FormData => ({
  subsidiaries:
    organisation?.subsidiaries?.map(
      ({ id: _id, pivot: _pivot, name, ...rest }) => ({
        name,
        address: rest,
      })
    ) || [],
});
