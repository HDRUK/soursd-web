"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import ContactLink from "@/components/ContactLink";
import ChipStatus, { Status } from "@/components/ChipStatus";
import Table from "@/components/Table";
import { StoreUserHistories } from "@/data/store";
import { GetAffiliationsResponse } from "@/services/affiliations/types";
import { ResearcherAffiliation } from "@/types/application";
import { Paged } from "@/types/requests";
import {
  renderAffiliationDateRangeCell,
  renderWarningCell,
} from "@/utils/cells";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

interface AffiliationsProps {
  setHistories?: (histories: StoreUserHistories) => void;
  getHistories?: () => StoreUserHistories | undefined;
  extraColumns?: ColumnDef<ResearcherAffiliation>[];
  affiliationsData:
    | (Response & {
        data: Paged<GetAffiliationsResponse>;
        message: string;
        status: number;
      })
    | undefined;
  getAffiliationsQueryState;
}

export default function Affiliations({
  setHistories,
  getHistories,
  extraColumns,
  affiliationsData,
  getAffiliationsQueryState,
}: AffiliationsProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const renderRelationship = (
    info: CellContext<ResearcherAffiliation, unknown>
  ) => {
    const value = info.getValue() as string;
    return value?.length > 0 ? tApplication(info.getValue()) : null;
  };

  const renderStatus = (info: CellContext<ResearcherAffiliation, unknown>) => (
    <ChipStatus status={info.getValue() as Status} color="success" />
  );

  const columns: ColumnDef<ResearcherAffiliation>[] = [
    {
      accessorKey: "warning",
      header: "",
      cell: renderWarningCell,
    },
    {
      accessorKey: "date",
      header: tApplication("period"),
      cell: renderAffiliationDateRangeCell,
    },
    {
      accessorKey: "organisation_name",
      header: tApplication("organisationName"),
      cell: info => info.row.original.organisation.organisation_name,
    },
    {
      accessorKey: "relationship",
      header: tApplication("relationship"),
      cell: renderRelationship,
    },
    {
      accessorKey: "member_id",
      header: tApplication("staffStudentId"),
    },
    {
      accessorKey: "registryAffiliationState",
      header: tApplication("status"),
      cell: renderStatus,
    },
    ...(extraColumns ?? []),
  ];

  useEffect(() => {
    const storeHistories = getHistories?.();

    setHistories?.({
      ...storeHistories,
      affiliations: affiliationsData?.data?.data,
    });
  }, [affiliationsData?.data?.data]);

  return (
    <Table
      noResultsMessage={tProfile("affiliationsNoResultsMessage")}
      errorMessage={tProfile.rich("affiliationsErrorMessage", {
        contactLink: ContactLink,
      })}
      total={affiliationsData?.data.data.length}
      data={affiliationsData?.data.data || []}
      columns={columns}
      queryState={getAffiliationsQueryState}
    />
  );
}
