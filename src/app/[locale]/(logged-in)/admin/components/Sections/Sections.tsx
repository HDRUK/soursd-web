"use client";

import sendInvite from "@/services/custodians/sendInvite";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useCallback, useMemo } from "react";

import ApplicationLink from "@/components/ApplicationLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import yup from "@/config/yup";
import getCustodians from "@/services/custodians/getCustodians";
import { SendCustodianInvitePayload } from "@/services/custodians/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { EmailTemplates } from "../../consts/emailTemplates";
import { EmailTypes } from "../../consts/emailTypes";

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);

  const { mutateAsync: mutateInviteAsync, isPending } = useMutation({
    mutationKey: ["sendInvite"],
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    mutationFn: (payload: any) => {
      return sendInvite(payload, {
        error: { message: "sendInviteError" },
      });
    },
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        to: yup
          .number()
          .positive()
          .required(tValidation("custodianRequiredInvalid"))
          .min(1),
      }),
    []
  );

  const methods = useForm<SendCustodianInvitePayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      to: 0,
    },
    disabled: isPending,
  });

  const handleSendInvite = useCallback(
    async (payload: SendCustodianInvitePayload) => {
      mutateInviteAsync({
        to: payload.to,
        type: EmailTypes.CUSTODIAN,
        identifier: EmailTemplates.CUSTODIAN_INVITE,
      });
    },
    []
  );

  const {
    isError: isGetCustodiansError,
    isLoading: isGetCustodiansLoading,
    data: custodiansData,
  } = useQuery({
    queryKey: ["getCustodians"],
    queryFn: () =>
      getCustodians({
        error: { message: "noCustodians" },
      }),
  });

  const { register, handleSubmit } = methods;

  if (isGetCustodiansLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (isGetCustodiansError) {
    return (
      <OverlayCenterAlert>
        {t.rich("noCustodians", {
          applicationLink: ApplicationLink,
        })}
      </OverlayCenterAlert>
    );
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          id="data-custodian-invite"
          aria-controls="data-custodian-invite-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("custodianInviteTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("custodianInviteBody")}</Typography>
          <Typography variant="subtitle2">
            {t("custodianInviteSubtitle")}
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleSendInvite)}>
              <Box display="flex" alignItems="center" gap={2}>
                <FormControl sx={{ m: 3, minWidth: 340 }}>
                  <InputLabel id="data-custodian-select-label">
                    Select Custodian...
                  </InputLabel>
                  <Select
                    {...register("to")}
                    id="data-custodian-invite-select"
                    labelId="data-custodian-select-label"
                    inputProps={{
                      "aria-label": "custodians",
                    }}
                    label="Select Custodian...">
                    {custodiansData?.data.data.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Button type="submit" color="secondary" variant="contained">
                    {t("custodianInviteButton")}
                  </Button>
                </FormControl>
              </Box>
            </form>
          </FormProvider>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          id="system-config"
          aria-controls="system-config-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("systemConfigTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("systemConfigBody")}</Typography>
          <Typography variant="subtitle2">
            {t("systemConfigSubtitle")}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
