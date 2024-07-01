"use client";

import * as yup from "yup";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Box, OutlinedInput } from "@mui/material";
import SystemConfigForm, { SystemConfigFormValues } from "../SystemConfigForm/SystemConfigForm";

export default function Sections() {

    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    const handleFormSubmit = (values: SystemConfigFormValues) => {
        fetch(`${process.env.NEXT_PUBLIC_API_V1_URL}/system_config`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then((response) => {
            console.log(response.json());
        });
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_V1_URL}/system_config`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Accordion>
                <AccordionSummary
                    id="issuer-invite"
                    aria-controls="issuer-invite-content"
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography>Issuer Invitation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Invite Issuers to use the SPeeDI-AS System</Typography>
                    <Typography>Issuers are typically Data Custodian's, such as TREs and SDEs</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    id="system-config"
                    aria-controls="system-config-content"
                    expandIcon={<ArrowDropDownIcon />}
                >
                    <Typography>System Configuration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Update or add new System Configuration parameters</Typography>
                    <Typography>Parameters are in the form of NameValuePairs</Typography>
                    <SystemConfigForm 
                        onSubmit={handleFormSubmit}
                        mutateState={{
                            isError: false,
                            isLoading: false,
                        }}
                    />
                    <SystemConfigList
                    />
                </AccordionDetails>
            
                {/* <AccordionDetails>
                    { isLoading == false && (
                        data?.data.map((sysConfig) => {
                            <>
                                {sysConfig.name} - {sysConfig.value}
                            </>
                        })
                    )}
                </AccordionDetails> */}
            </Accordion>
        </>
    );
};
