"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormActions from "@/components/FormActions";
import { FormMutateState } from "@/types/form";
import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Box,
    FormControl,
    Grid,
    TextField,
    useTheme,
  } from "@mui/material";
import FormBody from "@/components/FormBody";
import { Typography } from "@mui/material";
import { mapQueryStatusFilter } from "react-query/types/core/utils";

export interface SystemConfigFormValues {
    name: string;
    value: string;
};

export type SystemConfigFormProps = {
    onSubmit: (values: SystemConfigFormValues) => void;
    mutateState: FormMutateState;
};

export default function SystemConfigForm({ onSubmit, mutateState }: SystemConfigFormProps) {
    const theme = useTheme();

    const schema = useMemo(
        () => 
            yup.object().shape({
                name: yup.string().required(),
                value: yup.string().required(),
            }),
        []
    );

    const methods = useForm<SystemConfigFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            value: "",
        },
    });

    const handleFormSubmit = (values: SystemConfigFormValues) => {
        onSubmit(values);
    };

    const {
        register,
        formState: { errors },
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
                    { mutateState.isError && (
                        <Alert color="error" sx={{ mb: 3 }}>
                            <Typography>Error</Typography>
                        </Alert>
                    )}
                    <Grid container direction="row" spacing={ 2 }>
                        <Grid item md={ 6 }>
                            <Typography>Add new Config</Typography>                    
                        </Grid>
                        <Grid item md={ 6 }>
                                <FormControl error={ !!errors.name } size="medium" fullWidth>
                                    <TextField
                                        id="name"
                                        size="small"
                                        placeholder="Name"
                                        aria-label="Name"
                                        label="Name"
                                        {...register("name")}
                                        sx={{ width: 1 }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item md={ 6 }>
                                <FormControl error={ !!errors.value } size="medium" fullWidth>
                                    <TextField
                                        id="value"
                                        size="small"
                                        placeholder="Value"
                                        aria-label="Value"
                                        label="Value"
                                        {...register("value")}
                                        sx={{ width: 1 }}
                                    />
                                </FormControl>
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
                        loading={mutateState.isLoading}
                        sx={{ width: 1 }}
                    >
                            Create
                    </LoadingButton>
                </FormActions>
            </Box>
        </FormProvider>
    )
};
