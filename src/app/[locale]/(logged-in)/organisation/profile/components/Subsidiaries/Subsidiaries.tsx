"use client";

import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Subsidiary, Organisation } from "@/types/application";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import Table from "@/components/Table";
import { formatAddress } from "@/utils/address";
import ModalFormButton from "@/components/ModalFormButton";

import SubsidiaryForm, { SubsidiaryFormValues } from "./SubsidiaryForm";
import RemoveSubsidiary from "./RemoveSubsidiary";
import EditSubsidiary from "./EditSubsidiary";

import usePatchOrganisation from "../../hooks/usePatchOrganisation";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function Subsidiaries() {
  const organisation = useStore(state => state.config.organisation);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const {
    isPending: isLoading,
    onSubmit,
    ...patchOrganisationQueryState
  } = usePatchOrganisation({
    id: organisation?.id,
  });

  const handleSubmit = async (fields: SubsidiaryFormValues) => {
    const payload = {
      subsidiaries: [
        ...(organisation?.subsidiaries?.map(
          ({
            name,
            address_1,
            address_2,
            town,
            county,
            country,
            postcode,
          }) => ({
            name,
            address: {
              address_1,
              address_2,
              town,
              county,
              country,
              postcode,
            },
          })
        ) ?? []),
        {
          name: fields.subsidiary_name,
          address: fields.subsidiary_address,
        },
      ],
    } as Partial<Organisation>;

    return onSubmit(payload);
  };

  const renderActions = (info: CellContext<Subsidiary, unknown>) => (
    <>
      <EditSubsidiary
        isLoading={isLoading}
        subsidiary={info.row.original}
        onSubmit={onSubmit}
      />
      <RemoveSubsidiary
        isLoading={isLoading}
        subsidiary={info.row.original}
        onSubmit={onSubmit}
      />
    </>
  );

  const renderNameCell = (info: CellContext<Subsidiary, unknown>) => (
    <Typography color="primary">{info.getValue() as string}</Typography>
  );

  const columns: ColumnDef<Subsidiary>[] = [
    {
      accessorKey: "name",
      cell: renderNameCell,
    },
    {
      accessorKey: "address",
      cell: ({ row: { original } }) => formatAddress(original),
    },
    {
      accessorKey: "actions",
      cell: renderActions,
    },
  ];

  const renderFormContent = (closeModal: () => void, isLoading?: boolean) => (
    <SubsidiaryForm
      isLoading={isLoading}
      onSubmit={data => {
        handleSubmit(data).then(() => closeModal());
      }}
    />
  );

  return (
    <PageSection heading={tForm("organisationSubsidiaries")}>
      <Table
        showHeader={false}
        data={organisation?.subsidiaries || []}
        columns={columns}
        queryState={patchOrganisationQueryState}
      />

      <ModalFormButton
        isLoading={isLoading}
        buttonText={tProfile("addAnotherSubsidiary")}
        formContent={({ closeModal, isLoading }) =>
          renderFormContent(closeModal, isLoading)
        }
      />
    </PageSection>
  );
}
