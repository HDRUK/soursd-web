"use client";

import * as yup from "yup";

import { FormActions } from "@/components/FormActions";
import { useMemo } from "react";
import { FormMutateState } from "@/types/form";
import { FormProvider, useForm } from "react-hook-form";

import {
    Box,
    FormControl,
    Grid,
    TextField,
    useTheme,
} from "@mui/material";
import FormBody from "@/components/FormBody";
import { Typography } from "@mui/material";
import { SystemConfigFormValues } from "../SystemConfigForm/SystemConfigForm";
import { yupResolver } from "@hookform/resolvers/yup";

export interface SystemConfigListValues extends Array<SystemConfigFormValues>{};

export type SystemConfigListProps = {
    systemConfigArray: SystemConfigListValues;
    onSubmit: (values: SystemConfigFormValues) => void;
    mutateState: FormMutateState;
};

export default function SystemConfigList({ systemConfigArray, onSubmit, mutateState }: SystemConfigListProps) {
    const theme = useTheme();

    const schema = useMemo(
        () =>
            yup.object().shape({

            }),
        []
    );

    const methods = useForm<SystemConfigListValues>({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const handleFormSubmit = (values: SystemConfigFormValues) => {
        onSubmit(values);
    };

    return (
        <FormProvider>
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
            </Box>
        </FormProvider>
    );
};
