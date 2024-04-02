"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, OutlinedInput, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { StyledForm, StyledFormPersonalDetails } from "./ContactForm.styles";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const t = useTranslations("ContactForm");
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledFormPersonalDetails>
        <OutlinedInput
          {...register("name")}
          size="small"
          placeholder={t("namePlaceholder")}
          error={!!errors.name}
          startAdornment={<PersonIcon sx={{ color: "white" }} />}
          aria-label="name"
        />
        <OutlinedInput
          {...register("email")}
          size="small"
          placeholder={t("emailPlaceholder")}
          error={!!errors.email}
          startAdornment={<EmailIcon sx={{ color: "white" }} />}
          aria-label="email"
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
            aria-label="message"
          />
        </Box>
        <Button type="submit" color="inherit" variant="contained">
          {t("sendButton")}
        </Button>
      </Box>
    </StyledForm>
  );
}
