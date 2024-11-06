import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormRecaptcha from "@/components/FormRecaptcha";
import { Message } from "@/components/Message";
import PasswordTextField from "@/components/PasswordTextField";
import yup from "@/config/yup";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { useApplicationData } from "@/context/ApplicationData";
import { Organisation } from "@/services/organisations";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";

export interface SignupFormValues {
  email: string;
  first_name: string;
  last_name: string;
  organisation: string;
  password?: string | undefined;
  confirmPassword: string;
  tscs: NonNullable<boolean | undefined>;
  consentScrape?: boolean | undefined;
  orc_id: string;
}

export interface SignupFormProps {
  mutateState: FormMutateState;
  onSubmit: (data: SignupFormValues) => void;
  organisations?: Organisation[];
  defaultOrganisation?: string;
  defaultEmail?: string;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function SignupForm({
  onSubmit,
  mutateState,
  organisations,
  defaultOrganisation,
  defaultEmail,
}: SignupFormProps) {
  const {
    validationSchema: { password },
  } = useApplicationData();
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup
          .string()
          .required(tValidation("firstNameRequiredInvalid")),
        last_name: yup
          .string()
          .required(tValidation("lastNameRequiredInvalid")),
        organisation: yup
          .string()
          .required(tValidation("organisationNameRequiredInvalid")),
        email: yup
          .string()
          .required(tValidation("emailRequiredInvalid"))
          .email(tValidation("emailFormatInvalid")),
        password: yup
          .string()
          .required(tValidation("passwordRequiredInvalid"))
          .testLengthBetween(
            { minLength: password.minLength, maxLength: password.maxLength },
            tValidation("passwordLengthInvalid", {
              minLength: password.minLength,
              maxLength: password.maxLength,
            })
          )
          .matches(
            new RegExp(password.pattern),
            tValidation("passwordFormatInvalid")
          ),
        confirmPassword: yup
          .string()
          .required(tValidation("confirmPasswordRequiredInvalid"))
          .oneOf(
            [yup.ref("password"), ""],
            tValidation("confirmPasswordMatchInvalid")
          ),
        tscs: yup
          .bool()
          .oneOf([true], tValidation("tscsRequiredInvalid"))
          .required(tValidation("tscsRequiredInvalid")),
        consentScrape: yup.bool(),
        orc_id: yup
          .string()
          .matches(
            new RegExp(`(${VALIDATION_ORC_ID.source})|^$`),
            tValidation("orcIdFormatInvalid")
          )
          .when("consentScrape", {
            is: true,
            then: () =>
              yup
                .string()
                .required(tValidation("orcIdRequiredInvalid"))
                .matches(VALIDATION_ORC_ID, tValidation("orcIdFormatInvalid")),
          }),
      }),
    []
  );

  const handleFormSubmit = (data: SignupFormValues) => {
    if (recaptchaRef.current) {
      if (recaptchaRef.current.getValue()) {
        setRecaptchaError("");
        onSubmit(data);
      } else {
        setRecaptchaError(tValidation("recaptchaError"));
      }
    }
  };

  const methods = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      organisation: defaultOrganisation,
      email: defaultEmail,
      password: "",
      confirmPassword: "",
      tscs: false,
      consentScrape: false,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
        sx={{
          width: "auto",
          [".MuiGrid-root .MuiGrid-item"]: {
            maxWidth: "100%",
          },
          [theme.breakpoints.up("md")]: { width: "350px" },
        }}>
        <FormBody>
          {mutateState.isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {tSignup.rich(mutateState.error, {
                contactLink: ContactLink,
              })}
            </Message>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.organisation} size="small" fullWidth>
                <InputLabel id="organisation">
                  {tSignup("organisation")} *
                </InputLabel>
                <Select
                  defaultValue=""
                  {...register("organisation")}
                  size="small"
                  inputProps={{
                    "aria-label": tSignup("organisation"),
                  }}
                  label={<>{tSignup("organisation")} *</>}
                  disabled={!!defaultOrganisation}>
                  {organisations?.map(({ organisation_name, id }) => (
                    <MenuItem value={id} key={id}>
                      {organisation_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.organisation && (
                  <FormHelperText>{errors.organisation.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {!defaultEmail && (
              <Grid item>
                <FormControl error={!!errors.email} size="small" fullWidth>
                  <TextField
                    {...register("email")}
                    size="small"
                    placeholder={tSignup("emailPlaceholder")}
                    label={<>{tSignup("email")} *</>}
                  />
                  {errors.email && (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl error={!!errors.first_name} size="small" fullWidth>
                <TextField
                  {...register("first_name")}
                  size="small"
                  placeholder={tSignup("firstNamePlaceholder")}
                  label={<>{tSignup("firstName")} *</>}
                />
                {errors.first_name && (
                  <FormHelperText>{errors.first_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.last_name} size="small" fullWidth>
                <TextField
                  {...register("last_name")}
                  size="small"
                  placeholder={tSignup("lastNamePlaceholder")}
                  label={<>{tSignup("lastName")} *</>}
                />
                {errors.last_name && (
                  <FormHelperText>{errors.last_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.orc_id} size="small" fullWidth>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                  }}>
                  <TextField
                    {...register("orc_id")}
                    size="small"
                    placeholder={tSignup("orcIdPlaceholder")}
                    label={<>{tSignup("orcId")} *</>}
                    fullWidth
                  />
                  <Tooltip title={tSignup("whatIsTheOrcId")}>
                    <InfoIcon color="info" />
                  </Tooltip>
                </Box>

                {errors.orc_id && (
                  <FormHelperText>{errors.orc_id.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.password} size="small" fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tSignup("passwordPlaceholder")}
                  label={<>{tSignup("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("togglePasswordAriaLabel"),
                  }}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.confirmPassword}
                size="small"
                fullWidth>
                <PasswordTextField
                  id="confirmPassword"
                  size="small"
                  placeholder={tSignup("confirmPasswordPlaceholder")}
                  label={<>{tSignup("confirmPassword")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("toggleConfirmPasswordAriaLabel"),
                  }}
                />
                {errors.confirmPassword && (
                  <FormHelperText>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.tscs} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("tscs")} />}
                  label={tSignup("agreeTermsAndConditions")}
                  aria-label={tSignup("agreeTermsAndConditionsAriaLabel")}
                />
                {errors.tscs && (
                  <FormHelperText>{errors.tscs.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.tscs} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("consentScrape")} />}
                  label={tSignup("consentScrape")}
                  aria-label={tSignup("consentScrapeAriaLabel")}
                />
                {errors.tscs && (
                  <FormHelperText>{errors.tscs.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormRecaptcha ref={recaptchaRef} error={recaptchaError} />
            </Grid>
          </Grid>
        </FormBody>
        <FormActions>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
            loading={mutateState.isLoading}>
            {tSignup("signupButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
