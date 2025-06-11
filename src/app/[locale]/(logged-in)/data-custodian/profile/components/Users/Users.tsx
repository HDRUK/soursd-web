"use client";

import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useProjectsUsersQuery from "@/services/custodians/useCustodianProjectsUsersQuery";
import { CustodianProjectUser, User } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import { Box, Typography } from "@mui/material";
import { renderUserNameCell } from "@/utils/cells";
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
  } = useProjectsUsersQuery(entityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!entityId,
  });

  const columns: ColumnDef<CustodianProjectUser>[] = [
    {
      accessorKey: "registry.user.id",
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

        return renderUserNameCell(
          {
            first_name: info.row.original.registry.user.first_name,
            last_name: info.row.original.registry.user.last_name,
            id: info.getValue(),
          } as User,
          route.path,
          { projectId: info.row.original.project_id }
        );
      },
    },
    {
      accessorKey: "affiliation.organisation.organisation_name",
      header: t("organisation"),
    },
    {
      accessorKey: "project.title",
      header: t("title"),
    },
    {
      accessorKey: "role.name",
      header: tApplication("projectRole"),
    },
    {
      accessorKey: "status.to.be.implemented",
      header: t("validationStatus"),
      // this needs to be BE implemented to be the model state per custodian validation/approval
      cell: info => (
        <ChipStatus status={info.row.original.model_state?.state.slug} />
      ),
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
