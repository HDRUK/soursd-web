"use client";

import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { StoreState, useStore } from "@/data/store";
import PageSection from "@/modules/PageSection";
import { ProjectEntities } from "@/services/projects/getEntityProjects";
import useProjectsUsersQuery from "@/services/custodians/useCustodianProjectsUsersQuery";
import { CustodianProjectUser } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import { Box, Typography } from "@mui/material";

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

  const {
    data: projectsData,
    page,
    last_page,
    total,
    setPage,
    ...queryState
  } = useProjectsUsersQuery(entityId, {
    variant,
    queryKeyBase: ["getProjects"],
    enabled: !!entityId,
  });

  const columns: ColumnDef<CustodianProjectUser>[] = [
    {
      accessorFn: row => `${row.first_name} ${row.last_name}`,
      header: t("userName"),
    },
    {
      accessorKey: "organisation_name",
      header: t("organisation"),
    },
    {
      accessorKey: "project_name",
      header: t("title"),
    },
    {
      accessorKey: "project_role",
      header: tApplication("projectRole"),
    },
    {
      accessorKey: "status",
      header: t("status"),
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
