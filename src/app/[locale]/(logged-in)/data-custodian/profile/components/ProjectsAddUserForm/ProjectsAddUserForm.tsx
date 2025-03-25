"use client";

import ContactLink from "@/components/ContactLink";
import Table from "@/components/Table";
import {
  useGetPaginatedUsers,
  useGetSearchAffiliationsUsers,
} from "@/services/users";
import { User } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  // const queryClient = useQueryClient();
  // const project = useStore(state => state.getProject());

  const {
    data: usersData,
    total,
    ...getUserQueryState
  } = useGetSearchAffiliationsUsers();

  // const handleSubmit = async (payload: PutProjectPayload) => {
  //   await mutatePutAsync(payload);

  //   queryClient.refetchQueries({ queryKey: ["getProject", project.id] });
  // };

  // useQueryAlerts(restPutQueryState, {
  //   errorAlertProps: {
  //     text: t("safeProjectWorkflowStatusError"),
  //   },
  // });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        cell: row => renderUserNameCell(row),
      },
      {
        accessorKey: "email",
        header: t("email"),
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={usersData}
      queryState={getUserQueryState}
      noResultsMessage={t("professionalRegistrationsNoResultsMessage")}
      errorMessage={t.rich("professionalRegsitrationsErrorMessage", {
        contactLink: ContactLink,
      })}
      total={total}
      isPaginated
    />
  );
}
