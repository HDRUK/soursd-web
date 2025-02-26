import { FormHelperText } from "@mui/material";
import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormRecaptchaProps {
  error: string;
}

const FormRecaptcha = forwardRef<ReCAPTCHA, FormRecaptchaProps>(
  ({ error }, ref) => {
    return (
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <>
          <ReCAPTCHA
            ref={ref}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            data-size="normal"
          />
          {!!error && <FormHelperText error={!!error}>{error}</FormHelperText>}
        </>
      )
    );
  }
);

export default FormRecaptcha;
