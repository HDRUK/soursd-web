"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormModalBody from "@/components/FormModalBody";
import SelectInput from "@/components/SelectInput";
import Table from "@/components/Table";
import { useStore } from "@/data/store";
import SearchBar from "@/modules/SearchBar";
import { useGetProjectAllUsers } from "@/services/projects";
import { ProjectAllUser, Role } from "@/types/application";
import { MutationState } from "@/types/form";
import { renderUserNameCell } from "@/utils/cells";
import { LoadingButton } from "@mui/lab";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export type RowUserState = {
  user_digital_ident: string;
  project_role_id: number;
  affiliation_id: number;
}[];

interface ProjectsAddUserProps {
  projectId: number;
  mutationState: MutationState;
  onSave: (projectUsers: ProjectAllUser[]) => void;
}

export default function ProjectsAddUser({
  projectId,
  onSave,
  mutationState,
}: ProjectsAddUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const {
    data: usersData,
    total,
    updateQueryParams,
    resetQueryParams,
    ...getUserQueryState
  } = useGetProjectAllUsers(projectId, {
    defaultQueryParams: { "user_group__and[]": "USERS" },
  });

  const [projectUsers, setProjectUsers] = useState<ProjectAllUser[]>([]);

  useEffect(() => {
    if (usersData) setProjectUsers(usersData);
  }, [usersData]);

  const selectedProjectUsers = useMemo(
    () => projectUsers?.filter(u => !!u.role),

    [projectUsers]
  );

  const projectRoles = useStore(state => state.getProjectRoles());

  const handleSelectRole = (row: ProjectAllUser, roleId: number) => {
    const updatedRole = projectRoles.find(
      role => role?.id === roleId
    ) as Partial<Role>;

    setProjectUsers(prevUsers => {
      const exists = prevUsers.some(user => user.id === row.id);
      if (exists) {
        return prevUsers.map(user =>
          user.id === row.id ? { ...user, role: updatedRole } : user
        );
      }
      return [...prevUsers, { ...row, role: updatedRole }];
    });
  };

  const renderRoleSelectorCell = (
    info: CellContext<ProjectAllUser, unknown>
  ) => (
    <SelectInput
      value={info.getValue() as number}
      size="small"
      options={projectRoles.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
      onChange={({ target: { value } }) => {
        handleSelectRole(info.row.original, value as number);
        return value;
      }}
    />
  );

  const columns: ColumnDef<ProjectAllUser>[] = [
    {
      accessorKey: "name",
      header: tApplication("name"),
      cell: (info: CellContext<ProjectAllUser, unknown>) =>
        renderUserNameCell(info.row.original),
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
      accessorKey: "role.id",
      header: tApplication("role"),
      cell: renderRoleSelectorCell,
    },
  ];

  return (
    <>
      <FormModalBody>
        <SearchBar
          onClear={resetQueryParams}
          onSearch={(text: string) => {
            updateQueryParams({
              "first_name[]": text,
              "last_name[]": text,
            });
          }}
          placeholder={t("searchPlaceholder")}
        />
        <Table
          columns={columns}
          data={projectUsers}
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
          onClick={() => onSave(selectedProjectUsers)}>
          {tApplication("saveButton")}
        </LoadingButton>
      </FormActions>
    </>
  );
}
