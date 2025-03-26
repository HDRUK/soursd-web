"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormModalBody from "@/components/FormModalBody";
import SelectInput from "@/components/SelectInput";
import Table from "@/components/Table";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import SearchBar from "@/modules/SearchBar";
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

type UserByAffiliation = {
  first_name: string;
  user_digital_ident: string;
  affiliation_id: number;
  last_name: string;
};

export type RowUserState = {
  user_digital_ident: string;
  project_role_id: number;
  affiliation_id: number;
}[];

interface ProjectsAddUserProps {
  mutationState: MutationState;
  onSave: (users: RowUserState) => void;
}

export default function ProjectsAddUser({
  onSave,
  mutationState,
}: ProjectsAddUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  // const queryClient = useQueryClient();
  // const project = useStore(state => state.getProject());

  const [selected, setSelected] = useState<RowUserState>([]);

  const {
    data: usersData,
    total,
    updateQueryParams,
    ...getUserQueryState
  } = useGetPaginatedUsers();

  const projectRoles = useStore(state => state.getProjectRoles());

  const handleSelectRole = (row: UserByAffiliation, roleId: number) => {
    const { user_digital_ident, affiliation_id } = row;

    setSelected([
      ...selected,
      {
        user_digital_ident,
        affiliation_id,
        project_role_id: roleId,
      },
    ]);
  };

  const getUsersByAffiliations = () => {
    let usersByAffiliation: UserByAffiliation[] = [];

    usersData?.forEach(({ first_name, last_name, registry }) => {
      registry?.affiliations?.map(affiliation => {
        usersByAffiliation.push({
          ...affiliation,
          affiliation_id: affiliation.id,
          organisation_name: affiliation.organisation.organisation_name,
          user_digital_ident: registry.digi_ident,
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

  const getSelectedRoleId = ({
    affiliation_id,
    user_digital_ident,
  }: UserByAffiliation) => {
    const selectedRow = selected.find(
      row =>
        row.affiliation_id === affiliation_id &&
        row.user_digital_ident === user_digital_ident
    );

    return selectedRow?.project_role_id;
  };

  const renderRoleSelectorCell = useCallback(
    (info: CellContext<UserByAffiliation, unknown>) => (
      <SelectInput
        value={getSelectedRoleId(info.row.original)?.toString() || ""}
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
        accessorKey: "organisation_name",
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
        <SearchBar
          onSearch={(text: string) => {
            updateQueryParams({
              "first_name[]": text,
              "last_name[]": text,
              "email[]": text,
            });
          }}
          placeholder={t("searchPlaceholder")}
        />
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
