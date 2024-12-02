"use client";

import sendInvite from "@/services/dataCustodians/sendInvite";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useCallback, useMemo } from "react";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import yup from "@/config/yup";
import { SendIssuerInvitePayload } from "@/services/dataCustodians/types";
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
import getDataCustodians from "@/services/dataCustodians/getDataCustodians";
import { EmailTemplates } from "../../consts/emailTemplates";
import { EmailTypes } from "../../consts/emailTypes";

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);

  const { mutateAsync: mutateInviteAsync } = useMutation({
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
          .required(tValidation("issuerRequiredInvalid"))
          .min(1),
      }),
    []
  );

  const methods = useForm<SendIssuerInvitePayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      to: 0,
    },
  });

  const handleSendInvite = useCallback(
    async (payload: SendIssuerInvitePayload) => {
      mutateInviteAsync({
        to: payload.to,
        type: EmailTypes.DATA_CUSTODIAN,
        identifier: EmailTemplates.ISSUER_INVITE,
      });
    },
    []
  );

  const {
    isError: isGetDataCustodiansError,
    isLoading: isGetDataCustodiansLoading,
    data: dataCustodianData,
  } = useQuery({
    queryKey: ["getDataCustodians"],
    queryFn: () =>
      getDataCustodians({
        error: { message: "noDataCustodians" },
      }),
  });

  const { register, handleSubmit } = methods;

  if (isGetDataCustodiansLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (isGetDataCustodiansError) {
    return (
      <OverlayCenterAlert>
        {t.rich("noDataCustodians", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          id="issuer-invite"
          aria-controls="issuer-invite-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("issuerInviteTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("issuerInviteBody")}</Typography>
          <Typography variant="subtitle2">
            {t("issuerInviteSubtitle")}
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleSendInvite)}>
              <Box display="flex" alignItems="center" gap={2}>
                <FormControl sx={{ m: 3, minWidth: 340 }}>
                  <InputLabel id="issuer-select-label">
                    Select Issuer...
                  </InputLabel>
                  <Select
                    {...register("to")}
                    id="issuer-invite-select"
                    labelId="issuer-select-label"
                    inputProps={{
                      "aria-label": "data-custodians",
                    }}
                    label="Select Issuer...">
                    {dataCustodianData?.data.data.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <Button type="submit" color="secondary" variant="contained">
                    {t("issuerInviteButton")}
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
