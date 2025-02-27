import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PageGuidance, PageBody, PageSection } from "@/modules";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import CheckboxList from "@/components/CheckboxList";
import { mockedConfigurationRulesDescription, mockedConfigurationRulesGuidanceProps } from "@/mocks/data/cms";
import { showAlert } from "@/utils/showAlert";
import ContactLink from "@/components/ContactLink";
import ReactDOMServer from "react-dom/server";
import { EntityModelTypes } from "@/consts/custodian";
import { getCustodianEntityModelQuery, GetCustodianEntityModelResponse, putCustodianActiveEntityModelQuery } from "@/services/custodians";
import { Rule } from "@/types/rules";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import ButtonSave from "@/components/ButtonSave";

const NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE = "CustodianProfile";

export default function Rules() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE);
  const [userRules, setUserRules] = useState<boolean[]>([]);
  const [orgRules, setOrgRules] = useState<boolean[]>([]);
  const custodian = useStore(state => state.getCustodian());

  const { data: userRulesData, isLoading: isLoadingUserRules } = useQuery(
    getCustodianEntityModelQuery(custodian?.id, EntityModelTypes.USER_VALIDATION_RULES)
  );

  const { data: orgRulesData, isLoading: isLoadingOrgRules } = useQuery(
    getCustodianEntityModelQuery(custodian?.id, EntityModelTypes.ORG_VALIDATION_RULES)
  );

  const { mutateAsync, isPending, isError } = useMutation(
    putCustodianActiveEntityModelQuery(custodian?.id));

  const formatRules = (rulesData: any): Rule[] => {
    return rulesData?.data.map((rule: any) => {
      return {
        id: rule.id,
        label: rule.name || rule.id,
        text: rule.description || '',
        active: rule.active === true || rule.active === 1,
      };
    }) || [];
  };

  const formattedUserRules: Rule[] = useMemo(() => formatRules(userRulesData), [userRulesData]);
  const formattedOrgRules: Rule[] = useMemo(() => formatRules(orgRulesData), [orgRulesData]);

  useEffect(() => {
    if (userRulesData) {
      const newUserRules = formattedUserRules.map(rule => rule.active);
      setUserRules(newUserRules);
    }
    if (orgRulesData) {
      const newOrgRules = formattedOrgRules.map(rule => rule.active);
      setOrgRules(newOrgRules);
    }
  }, [userRulesData, orgRulesData, formattedUserRules, formattedOrgRules]);

  const UserRulesCheckboxList = useCallback(() => (
    <CheckboxList 
      items={formattedUserRules} 
      title={t("userRulesTitle")}
      checked={userRules}
      setChecked={setUserRules}
    />
  ), [formattedUserRules, userRules, setUserRules, t]);

  const OrgRulesCheckboxList = useCallback(() => (
    <CheckboxList 
      items={formattedOrgRules} 
      title={t("organisationRulesTitle")}
      checked={orgRules}
      setChecked={setOrgRules}
    />
  ), [formattedOrgRules, orgRules, setOrgRules, t]);

  const handleSubmit = async () => {
    const createRulePayload = (rulesData: (Response & { data: GetCustodianEntityModelResponse[]; message: string; status: number; }) | undefined, checkedState: boolean[]) => 
      rulesData?.data.map((rule: { id: any; }, index: number) => ({
        entity_model_id: rule.id,
        active: checkedState[index]
      })) || [];

      const payload = {
        configs: [
          ...createRulePayload(userRulesData, userRules),
          ...createRulePayload(orgRulesData, orgRules)
        ]
      };

    try {
      await mutateAsync(payload);
      showAlert("success", {
        text: t("updateRulesSuccess"),
        confirmButtonText: t("successButton"),
      });
    } catch (_) {
      showAlert("error", {
        text: ReactDOMServer.renderToString(
          t.rich("updateRulesError", {
            contactLink: ContactLink,
          })
        ),
        confirmButtonText: t("errorButton"),
      });
    }
  };

  const formOptions = {
    error: isError && t.rich("updateRulesError", { contactLink: ContactLink }),
  };

  return (
    <LoadingWrapper loading={isLoadingUserRules || isLoadingOrgRules}>
    <PageGuidance {...mockedConfigurationRulesGuidanceProps}>
      <PageBody>
        <Form onSubmit={handleSubmit} {...formOptions}>
          <PageSection heading={t("configurationRulesTitle")} description={mockedConfigurationRulesDescription}>
              <UserRulesCheckboxList />
              <OrgRulesCheckboxList />
          </PageSection>
          <FormActions>
            <ButtonSave isLoading={isPending} />
          </FormActions>
        </Form>
      </PageBody>
    </PageGuidance>
    </LoadingWrapper>

  );
}
