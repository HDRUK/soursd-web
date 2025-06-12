"use client";

import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useCustodianProjectsUsersQuery from "@/services/custodians/useCustodianProjectsUsersQuery";
import { CustodianProjectUser, ProjectUser, User } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import { Box, Typography } from "@mui/material";
import { renderProjectUserNameCell, renderUserNameCell } from "@/utils/cells";
import SearchBar from "@/modules/SearchBar";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_APPLICATION = "Application";
const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

type VariantConfig = {
  getId: (store: StoreState) => string | number | undefined;
};

const variantConfig: Record<ProjectEntities, VariantConfig> = {
  organisation: {
    getId: store => {
      const organisation = store.getOrganisation();
      return organisation?.id;
    },
  },
  custodian: {
    getId: store => {
      const custodian = store.getCustodian();
      return custodian?.id;
    },
  },
  user: {
    getId: store => {
      const user = store.getUser();
      return user?.id;
    },
  },
};

interface ProjectsProps {
  variant: ProjectEntities;
}

export default function Users({ variant }: ProjectsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tApplication = useTranslations(NAMESPACE_TRANSLATIONS_APPLICATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const store = useStore();
  const { getId } = variantConfig[variant];
  const entityId = getId(store);
  const routes = useStore(state => state.getApplication().routes);

  const {
    data: projectsData,
    page,
    last_page,
    total,
    setPage,
    updateQueryParams,
    resetQueryParams,
    ...queryState
  } = useCustodianProjectsUsersQuery(entityId, {
    variant,
    queryKeyBase: ["getCustionProjectUsers"],
    enabled: !!entityId,
  });

  const columns: ColumnDef<CustodianProjectUser>[] = [
    {
      accessorKey: "project_has_user",
      header: t("userName"),
      cell: info => {
        let route = null;

        switch (variant) {
          case "organisation":
            route = null;
            break;
          case "custodian":
            route = routes.profileCustodianUsersIdentity;
            break;
          case "user":
            route = null;
            break;
          default:
            route = null;
        }

        return renderProjectUserNameCell(
          info.getValue() as ProjectUser,
          route?.path
        );

        return renderUserNameCell(
          {
            first_name:
              info.row.original?.project_has_user.registry?.user.first_name,
            last_name:
              info.row.original?.project_has_user.registry?.user.last_name,
            id: info.getValue(),
          } as User,
          route.path,
          { projectId: info.row.original.project_has_user.project_id }
        );
      },
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
          <Table
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            data={projectsData}
            columns={columns}
            queryState={queryState}
            isPaginated
          />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
