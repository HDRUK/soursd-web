"use client";

// import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
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
    Button
} from "@mui/material";
import { Issuer } from "@/types/application";
import { SendIssuerInvitePayload } from "@/services/issuers/types";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections () {
    const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
    const [ data, setData ] = useState<Issuer[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const {
        mutateAsync: mutateInviteAsync,
        isError: isInviteError,
        isLoading: isInviteLoading,
        error: inviteError,
    } = useMutation(
        ["sendInvite"],
        async ( payload: SendIssuerInvitePayload ) => {
            return sendInvite(payload, {
                    error: { message: "sendInviteError" },
            });
        }
    )

    const methods = useForm<SendIssuerInvitePayload>({
        defaultValues: {
            to: 0,
            type: 'issuer',
            identifier: 'issuer_invite',
        },
    });

    const handleSendInvite = useCallback(
        async (payload: SendIssuerInvitePayload) => {
            mutateInviteAsync(payload);
        },
    []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_V1_URL}/issuers`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data.data);
                setIsLoading(false);
            });
    }, []);

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = methods;

    return (
        <>
            <Accordion>
                <AccordionSummary
                    id="issuer-invite"
                    aria-controls="issuer-invite-content"
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography>{t("IssuerInviteTitle")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{t("IssuerInviteBody")}</Typography>
                    <Typography variant="subtitle2">{t("IssuerInviteSubtitle")}</Typography>
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
                                        label="Issuers">
                                        {data?.map(({id, name }) => (
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
                                        {t("IssuerInviteButton")}
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
                    <Typography>{t("SystemConfigTitle")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{t("SystemConfigBody")}</Typography>
                    <Typography variant="subtitle2">{t("SystemConfigSubtitle")}</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

