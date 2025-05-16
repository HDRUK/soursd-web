import { useCallback, useMemo, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCustodianValidationChecksQuery,
  putValidationCheckQuery,
} from "@/services/validation_checks";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { Rule } from "@/types/rules";
import CheckboxList from "@/components/CheckboxList";
import Form from "@/components/Form";
import { getCombinedQueryState } from "@/utils/query";
import { ValidationCheck } from "@/services/validation_checks/types";

const NAMESPACE_TRANSLATION = "ValidationChecks";

export default function ValidationChecks() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const custodianId = useStore(store => store?.getCustodian()?.id);

  const [userChecks, setUserChecks] = useState<boolean[]>([]);
  const [orgChecks, setOrgChecks] = useState<boolean[]>([]);

  const { data: userValidationChecks, ...queryStateProjectUser } = useQuery(
    getCustodianValidationChecksQuery(custodianId as number, {
      "applies_to[]": "ProjectHasUser",
    })
  );

  const { data: organisationValidationChecks, ...queryStateOrganisation } =
    useQuery(
      getCustodianValidationChecksQuery(custodianId as number, {
        "applies_to[]": "Organisation",
      })
    );

  const refetch = () => {
    queryStateProjectUser.refetch();
    queryStateOrganisation.refetch();
  };

  const { isLoading } = getCombinedQueryState([
    queryStateProjectUser,
    queryStateOrganisation,
  ]);

  const { mutateAsync: updateValidationCheck } = useMutation(
    putValidationCheckQuery()
  );

  const formatChecks = (checks: ValidationCheck[]): Rule[] => {
    return (
      checks?.map(check => {
        return {
          id: check.id,
          text: check.description || "",
          active: check.enabled,
        };
      }) || []
    );
  };

  const formattedUserChecks: Rule[] = useMemo(
    () => formatChecks(userValidationChecks?.data || []),
    [userValidationChecks]
  );

  const formattedOrganisationChecks: Rule[] = useMemo(
    () => formatChecks(organisationValidationChecks?.data || []),
    [organisationValidationChecks]
  );

  useEffect(() => {
    if (formattedUserChecks) {
      const newUserChecks = formattedUserChecks.map(check => check.active);
      setUserChecks(newUserChecks);
    }
  }, [formattedUserChecks]);

  useEffect(() => {
    if (formattedOrganisationChecks) {
      const newOrgChecks = formattedOrganisationChecks.map(
        check => check.active
      );
      setOrgChecks(newOrgChecks);
    }
  }, [formattedOrganisationChecks]);

  const onEdit = async (data: Partial<Rule>): Promise<void> => {
    const { id, text } = data;
    const payload = {
      description: text,
    };
    if (!id) return;
    await updateValidationCheck({ id, payload });
    await refetch();
  };

  const UserRulesCheckboxList = useCallback(
    () => (
      <CheckboxList
        isLoading={isLoading}
        items={formattedUserChecks}
        title={t("userChecksTitle")}
        checked={userChecks}
        setChecked={setUserChecks}
        onEdit={onEdit}
      />
    ),
    [onEdit, userChecks, formattedUserChecks, t]
  );

  const OrganisationRulesCheckboxList = useCallback(
    () => (
      <CheckboxList
        isLoading={isLoading}
        items={formattedOrganisationChecks}
        title={t("organisationChecksTitle")}
        checked={orgChecks}
        setChecked={setOrgChecks}
        onEdit={onEdit}
      />
    ),
    [onEdit, orgChecks, formattedOrganisationChecks, t]
  );

  const handleSubmit = () => {};
  const formOptions = {};

  return (
    <Form onSubmit={handleSubmit} {...formOptions}>
      <UserRulesCheckboxList />
      <OrganisationRulesCheckboxList />
    </Form>
  );
}
