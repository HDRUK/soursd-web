"use client";

// import * as yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import sendInvite from "@/services/issuers/sendInvite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    Box,
    Select,
    Button,
    CircularProgress
} from "@mui/material";
import { Issuer } from "@/types/application";
import { SendIssuerInvitePayload } from "@/services/issuers/types";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useTranslations } from "next-intl";
import { EmailTypes } from "../../consts/emailTypes";
import { EmailTemplates } from "../../consts/emailTemplates";
import yup from "@/config/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getIssuers from "@/services/issuers/getIssuers";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections () {
    const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
    const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
    const [ data, setData ] = useState<Issuer[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const {
        mutateAsync: mutateInviteAsync,
        isError: isInviteError,
        isLoading: isInviteLoading,
        error: inviteError,
    } = useMutation(
        ["sendInvite"],
        async ( payload: any ) => {
            return sendInvite(payload, {
                    error: { message: "sendInviteError" },
            });
        }
    );

    const schema = useMemo(
        () => 
            yup.object().shape({
                to: yup
                    .number().positive()
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
                type: EmailTypes.ISSUER,
                identifier: EmailTemplates.ISSUER_INVITE
            });
        },
    []);

    const {
        isError: isGetIssuersError,
        isLoading: isGetIssuersLoading,
        data: issuersData,
        error: issuersError,
    } = useQuery(
        ["getIssuers"],
        async () => 
            getIssuers({
                error: { message: "noDataIssuers" },
            }),
    );

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = methods;

    if (isGetIssuersLoading) {
        return (
            <OverlayCenter sx={{ color: "#fff" }}>
                <CircularProgress color="inherit" />
            </OverlayCenter>
        );
    }

    if (isGetIssuersError) {
        return (
            <OverlayCenterAlert>
                {t.rich("noDataIssuers", {
                    contactLink: ContactLink,
                })}
            </OverlayCenterAlert>
        )
    }

    return (
        <>
            <Accordion>
                <AccordionSummary
                    id="issuer-invite"
                    aria-controls="issuer-invite-content"
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography>{t("issuerInviteTitle")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{t("issuerInviteBody")}</Typography>
                    <Typography variant="subtitle2">{t("issuerInviteSubtitle")}</Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleSendInvite)}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <FormControl sx={{ m: 3, minWidth: 340 }}>
                                    <InputLabel id="issuer-select-label">Select Issuer...</InputLabel>
                                    <Select
                                        {...register('to')}
                                        id="issuer-invite-select"
                                        labelId="issuer-select-label"
                                        inputProps={{
                                            "aria-label": "issuers",
                                        }}
                                        label="Select Issuer...">
                                        {issuersData?.data.data.map(({id, name }) => (
                                            <MenuItem value={id} key={id}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained">
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
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography>{t("systemConfigTitle")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{t("systemConfigBody")}</Typography>
                    <Typography variant="subtitle2">{t("systemConfigSubtitle")}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

