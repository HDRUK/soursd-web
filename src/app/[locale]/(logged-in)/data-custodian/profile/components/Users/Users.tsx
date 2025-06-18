"use client";

import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import { usePaginatedCustodianProjectUsers } from "@/services/custodian_approvals";
import { CustodianProjectUser, ProjectUser } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import { Box, Typography } from "@mui/material";
import { renderProjectUserNameCell } from "@/utils/cells";
import SearchBar from "@/modules/SearchBar";
import ProjectUsersBoard from "@/organisms/ProjectUsersBoard";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";
const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const store = useStore();
  const custodian = store.getCustodian();

  const routes = useStore(state => state.getApplication().routes);

  const {
    data: custodianProjectUsers,
    page,
    last_page,
    total,
    setPage,
    updateQueryParams,
    resetQueryParams,
    ...queryState
  } = usePaginatedCustodianProjectUsers(custodian?.id as number);

  const columns: ColumnDef<CustodianProjectUser>[] = [
    {
      accessorKey: "project_has_user",
      header: t("userName"),
      cell: info =>
        renderProjectUserNameCell(
          info.getValue() as ProjectUser,
          routes.profileCustodianUsersIdentity.path
        ),
    },
    {
      accessorKey:
        "project_has_user.affiliation.organisation.organisation_name",
      header: t("organisation"),
    },
    {
      accessorKey: "project_has_user.project.title",
      header: t("title"),
    },
    {
      accessorKey: "project_has_user.role.name",
      header: tApplication("projectRole"),
    },
    {
      accessorKey: "model_state.state.slug",
      header: t("validationStatus"),
      cell: info => <ChipStatus status={info.getValue()} />,
    },
  ];

  return (
    <PageBodyContainer heading={t("users")}>
      <PageBody>
        <PageSection>
          <Box>
            <Typography variant="body1">
              {tProfile("userListDescription")}
            </Typography>
          </Box>
          <Box sx={{ pt: 2 }}>
            <SearchBar
              onClear={resetQueryParams}
              onSearch={(text: string) => {
                updateQueryParams({
                  "name[]": text,
                });
              }}
              placeholder={tProfile("searchProjectUsersPlaceholder")}
            />
          </Box>
        </PageSection>
        <PageSection>
          {/* note this is using paginated data */}
          <ProjectUsersBoard
            custodianId={custodian?.id as number}
            custodianProjectUsers={custodianProjectUsers}
          />
        </PageSection>
        <PageSection>
          <Table
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={custodianProjectUsers}
            columns={columns}
            queryState={queryState}
            isPaginated
          />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
