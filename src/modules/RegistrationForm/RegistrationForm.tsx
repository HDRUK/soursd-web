"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, OutlinedInput, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import {
  StyledForm,
  StyledFormPersonalDetails,
} from "./RegistrationForm.styles";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function RegistrationForm() {
  const t = useTranslations("Footer");
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleOnSubmit = useCallback((data: object) => {
    console.log("FORM DATA", data);
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
      <StyledFormPersonalDetails>
        <OutlinedInput
          {...register("name")}
          size="small"
          placeholder={t("namePlaceholder")}
          error={!!errors.name}
          startAdornment={<PersonIcon sx={{ color: "white" }} />}
        />
        <OutlinedInput
          {...register("email")}
          size="small"
          placeholder={t("emailPlaceholder")}
          error={!!errors.email}
          startAdornment={<EmailIcon sx={{ color: "white" }} />}
        />
      </StyledFormPersonalDetails>
      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            {...register("message")}
            size="small"
            placeholder={t("messagePlaceholder")}
            error={!!errors.message}
            fullWidth
            startAdornment={<MessageIcon sx={{ color: "white" }} />}
          />
        </Box>
        <Button type="submit" color="inherit" variant="contained">
          Send
        </Button>
      </Box>
    </StyledForm>
  );
}
