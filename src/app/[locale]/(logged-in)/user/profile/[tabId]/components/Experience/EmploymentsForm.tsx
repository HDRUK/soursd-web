"use client";

import ApplicationLink from "@/components/ApplicationLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { AddressFields } from "@/types/application";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import { PostEmploymentsPayload } from "@/services/employments/types";
import { postEmployments } from "@/services/employments";
import { Add } from "@mui/icons-material";
import DateInput from "@/components/DateInput";
import { showAlert } from "@/utils/showAlert";

export interface EmploymentsFormValues {
  employer_name: string;
  department: string;
  address_1: string;
  address_2?: string | null;
  town: string;
  county: string;
  country: string;
  postcode: string;
  role: string;
  from: string;
  to?: string | null;
  ror: string;
  is_current: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export interface EmploymentsFormProps {
  onSubmit: (payload: PostEmploymentsPayload) => void;
}
export default function EmploymentsForm({ onSubmit }: EmploymentsFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const user = useStore(state => state.config.user);
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded);
  };

  const {
    mutateAsync: mutatePostAsync,
    isError: isPostError,
    isPending: isPostLoading,
    error: postError,
  } = useMutation({
    mutationKey: ["postEmployments", user?.id],
    mutationFn: (payload: PostEmploymentsPayload) =>
      postEmployments(user?.id, payload, {
        error: {
          message: "addEmploymentError",
        },
      }),
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        employer_name: yup
          .string()
          .required(tForm("employerNameRequiredInvalid")),
        department: yup.string().required(tForm("departmentRequiredInvalid")),
        address_1: yup.string().required(tForm("address1RequiredInvalid")),
        address_2: yup.string().nullable(),
        town: yup.string().required(tForm("townRequiredInvalid")),
        county: yup.string().required(tForm("countyRequiredInvalid")),
        country: yup.string().required(tForm("countryRequiredInvalid")),
        postcode: yup.string().required(tForm("postcodeRequiredInvalid")),
        role: yup.string().required(tForm("roleRequiredInvalid")),
        from: yup.string().required(tForm("fromRequiredInvalid")),
        is_current: yup.boolean().required(),
        to: yup.string().nullable(),
        ror: yup
          .string()
          .required(tForm("rorRequiredInvalid"))
          .matches(/^0[a-zA-Z0-9]{8}$/, tForm("rorInvalid")),
      }),
    [tForm]
  );

  const handleChange = (
    address: AddressFields,
    setValue: UseFormSetValue<EmploymentsFormValues>
  ) => {
    const { postcode, address_1, address_2, town, county, country } = address;

    setValue("address_1", address_1 ?? "");
    setValue("address_2", address_2 ?? "");
    setValue("town", town ?? "");
    setValue("county", county ?? "");
    setValue("country", country ?? "");
    setValue("postcode", postcode ?? "");
  };

  const formOptions = {
    defaultValues: {
      employer_name: "",
      department: "",
      address_1: "",
      address_2: "",
      town: "",
      county: "",
      country: "",
      postcode: "",
      role: "",
      from: "",
      to: "",
      ror: "",
      is_current: false,
    },
    error:
      isPostError &&
      tProfile.rich(postError, {
        applicationLink: ApplicationLink,
      }),
  };

  const handleEmploymentSubmit = useCallback(
    async (payload: EmploymentsFormValues) => {
      const employerAddress = [
        payload.address_1,
        payload.address_2,
        payload.town,
        payload.county,
        payload.country,
        payload.postcode,
      ]
        .filter(Boolean)
        .join(", ");

      const submissionPayload: PostEmploymentsPayload = {
        employer_name: payload.employer_name,
        from: payload.from,
        is_current: payload.is_current,
        to: payload.is_current ? null : payload.to,
        department: payload.department,
        role: payload.role,
        employer_address: employerAddress,
        ror: payload.ror,
      };

      try {
        await mutatePostAsync(submissionPayload);
        await onSubmit(submissionPayload);
        showAlert("success", {
          text: tForm("postEmploymentSuccess"),
          willClose: () => {
            setExpanded(false);
          },
        });
      } catch (_) {
        showAlert("error", {
          text: tForm("postEmploymentError"),
          confirmButtonText: tForm("tryAgainButton"),
        });
      }
    },
    [mutatePostAsync]
  );

  return (
    <Accordion
      sx={{ marginY: "10px", boxShadow: "none" }}
      expanded={expanded}
      onChange={handleAccordionChange}>
      <AccordionSummary
        id="data-custodian-invite"
        aria-controls="data-custodian-invite-content"
        expandIcon={<Add />}>
        <Typography>{tForm("addEmployment")}</Typography>
      </AccordionSummary>
      <Form
        schema={schema}
        onSubmit={handleEmploymentSubmit}
        {...formOptions}
        sx={{ paddingLeft: "16px" }}>
        {({ control, formState: { errors }, setValue, watch }) => {
          const isCurrent = watch("is_current");
          return (
            <>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="employer_name"
                    error={errors.employer_name}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="department"
                    error={errors.department}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <GoogleAutocomplete
                    name="address"
                    control={control}
                    onAddressSelected={value =>
                      handleChange(value as AddressFields, setValue)
                    }
                    textFieldProps={{ variant: "filled", size: "small" }}
                    placeholder="Search for your address..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="address_1"
                    error={errors.address_1}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="address_2"
                    error={errors.address_2}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="town"
                    error={errors.town}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="county"
                    error={errors.county}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="country"
                    error={errors.country}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="postcode"
                    error={errors.postcode}
                    renderField={fieldProps => (
                      <FormField
                        component={TextField}
                        {...fieldProps}
                        sx={{ maxWidth: "200px" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="role"
                    error={errors.role}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="from"
                    error={errors.from}
                    renderField={fieldProps => (
                      <FormField component={DateInput} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="is_current"
                    error={errors.from}
                    placeholder="is current"
                    renderField={fieldProps => (
                      <FormField component={Checkbox} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="to"
                    error={errors.to}
                    disabled={isCurrent}
                    renderField={fieldProps => (
                      <FormField component={DateInput} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="ror"
                    error={errors.ror}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
              </Grid>
              <FormActions>
                <LoadingButton
                  loading={isPostLoading}
                  type="submit"
                  endIcon={<SaveIcon />}
                  sx={{ display: "flex", justifySelf: "end" }}>
                  {tProfile("submitButton")}
                </LoadingButton>
              </FormActions>
            </>
          );
        }}
      </Form>
    </Accordion>
  );
}
