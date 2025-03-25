"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormModalBody from "@/components/FormModalBody";
import SelectInput from "@/components/SelectInput";
import Table from "@/components/Table";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { useGetPaginatedUsers } from "@/services/users";
import { ProjectRole, ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import { renderUserNameCell } from "@/utils/cells";
import { LoadingButton } from "@mui/lab";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

type UserByAffiliation = ResearcherAffiliation & {
  first_name: string;
  last_name: string;
  digi_ident: string;
};

export type SelectedUsers = Record<string, number>;

interface ProjectsAddUserProps {
  mutationState: MutationState;
  onSave: (users: SelectedUsers) => void;
}

export default function ProjectsAddUser({
  onSave,
  mutationState,
}: ProjectsAddUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  // const queryClient = useQueryClient();
  // const project = useStore(state => state.getProject());

  const [selected, setSelected] = useState<Record<string, number>>({});

  const {
    data: usersData,
    total,
    ...getUserQueryState
  } = useGetPaginatedUsers({
    defaultQueryParams: { "user_group[]": UserGroup.USERS },
  });

  const projectRoles = useStore(state => state.getProjectRoles());

  const handleSelectRole = (row: UserByAffiliation, roleId: number) => {
    setSelected({
      ...selected,
      [row.digi_ident]: roleId,
    });
  };

  const getUsersByAffiliations = () => {
    let usersByAffiliation: UserByAffiliation[] = [];

    usersData?.forEach(({ first_name, last_name, registry }) => {
      registry?.affiliations?.map(affiliation => {
        usersByAffiliation.push({
          ...affiliation,
          digi_ident: registry.digi_ident,
          first_name,
          last_name,
        });
      });
    });

    return usersByAffiliation;
  };

  // const handleSubmit = async (payload: PutProjectPayload) => {
  //   await mutatePutAsync(payload);

  //   queryClient.refetchQueries({ queryKey: ["getProject", project.id] });
  // };

  // useQueryAlerts(restPutQueryState, {
  //   errorAlertProps: {
  //     text: t("safeProjectWorkflowStatusError"),
  //   },
  // });

  const renderRoleSelectorCell = useCallback(
    (info: CellContext<UserByAffiliation, unknown>) => (
      <SelectInput
        size="small"
        options={projectRoles.map(({ id, name }) => ({
          label: name,
          value: id.toString(),
        }))}
        onChange={function ({ target: { value } }) {
          handleSelectRole(info.row.original, +value);
        }}
      />
    ),
    [selected]
  );

  const columns = useMemo<ColumnDef<UserByAffiliation>[]>(
    () => [
      {
        accessorKey: "name",
        header: tApplication("name"),
        cell: row => renderUserNameCell(row),
      },
      {
        accessorKey: "email",
        header: tApplication("email"),
      },
      {
        accessorKey: "organisation_id",
        header: tApplication("organisation"),
      },
      {
        accessorKey: "role",
        header: tApplication("role"),
        cell: renderRoleSelectorCell,
      },
    ],
    [selected]
  );

  return (
    <>
      <FormModalBody>
        <Table
          columns={columns}
          data={getUsersByAffiliations()}
          queryState={getUserQueryState}
          noResultsMessage={t("professionalRegistrationsNoResultsMessage")}
          errorMessage={t.rich("professionalRegsitrationsErrorMessage", {
            contactLink: ContactLink,
          })}
          total={total}
        />
      </FormModalBody>
      <FormActions>
        <LoadingButton
          loading={mutationState.isPending}
          onClick={() => onSave(selected)}>
          Done
        </LoadingButton>
      </FormActions>
    </>
  );
}
