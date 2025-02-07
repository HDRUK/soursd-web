import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCustodianRules,
  patchCustodianRules,
  getRules,
} from "@/services/rules";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import ListInfoItem from "@/components/ListInfoItem";
import { PageGuidance } from "@/modules";
import { useForm, Controller } from "react-hook-form";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { useStore } from "@/data/store";
import { useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import FormActions from "@/components/FormActions";
import { PatchCustodianRulesPayload } from "@/services/rules/patchCustodianRules";
import { showAlert } from "@/utils/showAlert";
import Form from "@/components/Form";
import { patchCustodian, PatchCustodianPayload } from "@/services/custodians";
import IdvtSection from "../IdvtSection";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

const Configuration = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { control, reset, handleSubmit } = useForm();
  const custodian = useStore(store => store.getCustodian());

  const { data: custodianRules, refetch } = useQuery({
    queryKey: ["getCustodianRules", custodian?.id],
    queryFn: ({ queryKey }) =>
      getCustodianRules(queryKey[1] as number, {
        error: {
          message: "getCustodianRulesError",
        },
      }),
  });

  const {
    mutateAsync: mutateUpdateRulesAsync,
    isPending: isUpdateRulesLoading,
  } = useMutation({
    mutationKey: ["patchCustodianRules", custodian?.id],
    mutationFn: (payload: PatchCustodianRulesPayload) =>
      patchCustodianRules(custodian?.id as number, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const {
    mutateAsync: mutateUpdateCustodianAsync,
    isPending: isUpdateCustodianLoading,
  } = useMutation({
    mutationKey: ["patchCustodian", custodian?.id],
    mutationFn: (payload: PatchCustodianPayload) =>
      patchCustodian(custodian?.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const { data: allRules } = useQuery({
    queryKey: ["getAllRules"],
    queryFn: () =>
      getRules({
        error: {
          message: "getAllRulesError",
        },
      }),
  });

  const custodianRuleIds = useMemo(
    () => new Set(custodianRules?.data?.map(r => r.id) || []),
    [custodianRules]
  );

  useEffect(() => {
    if (custodianRules && allRules) {
      const defaultValues = allRules.data.reduce(
        (acc, rule) => {
          acc[`rule-${rule.id}`] = custodianRuleIds.has(rule.id);
          return acc;
        },
        {} as Record<string, boolean>
      );
      reset(defaultValues);
    }
  }, [custodianRules, allRules, reset, custodianRuleIds]);

  const onSubmit = (formData: Record<string, boolean>) => {
    const enabledRules = Object.keys(formData)
      .filter(key => key.startsWith("rule-") && formData[key])
      .map(key => parseInt(key.replace("rule-", ""), 10));
    const rulesPayload = {
      rule_ids: enabledRules,
    } as PatchCustodianRulesPayload;

    const custodianPayload = {
      idvt_required: formData.idvt_required,
    } as PatchCustodianPayload;

    mutateUpdateRulesAsync(rulesPayload);
    mutateUpdateCustodianAsync(custodianPayload).then(() => {
      showAlert("success", {
        text: tProfile("saveSuccess"),
        confirmButtonText: tProfile("okButton"),
      });
      refetch();
    });
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" alignItems="stretch" gap={1}>
          {allRules?.data.map((rule, index) => (
            <ListInfoItem key={`info-box-${rule.name}`} index={index + 1}>
              <Controller
                name={`rule-${rule.id}`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    sx={{
                      m: 0,
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    labelPlacement="start"
                    control={<Checkbox {...field} checked={field.value} />}
                    label={
                      <Typography variant="body1">
                        <strong>
                          {rule.title} : {rule.description}
                        </strong>
                      </Typography>
                    }
                  />
                )}
              />
            </ListInfoItem>
          ))}
        </Box>
        <Controller
          name="idvt_required"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <IdvtSection switchProps={{ ...field, checked: field.value }} />
          )}
        />
        <FormActions>
          <LoadingButton
            type="submit"
            endIcon={<SaveIcon />}
            loading={isUpdateRulesLoading && isUpdateCustodianLoading}>
            {tProfile("submitButton")}
          </LoadingButton>
        </FormActions>
      </Form>
    </PageGuidance>
  );
};

export default Configuration;
