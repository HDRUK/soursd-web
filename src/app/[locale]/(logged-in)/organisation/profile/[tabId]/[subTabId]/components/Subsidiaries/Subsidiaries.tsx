"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Organisation } from "@/types/application";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import Table from "@/components/Table";
import { Subsidiary } from "@/types/application";
import { formatAddress } from "@/utils/address";
import ModalFormButton from "@/components/ModalFormButton";

import AddSubsidiaryForm, {
  AddSubsidiaryFormValues,
} from "./AddSubsidiaryForm";
import RemoveSubsidiary from "./RemoveSubsidiary";

import usePatchOrganisation from "../../../hooks/usePatchOrganisation";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function Subsidiaries() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const {
    isPending: isLoading,
    onSubmit,
    ...patchOrganisationQueryState
  } = usePatchOrganisation({
    id: organisation?.id,
  });

  const handleSubmit = (
    fields: AddSubsidiaryFormValues,
    callback?: () => void
  ) => {
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

    onSubmit(payload).then(() => {
      callback && callback();
    });
  };

  const renderActions = (info: CellContext<Subsidiary, unknown>) => (
    <>
      <RemoveSubsidiary
        isLoading={isLoading}
        subsidiary={info.row.original}
        onSubmit={onSubmit}
      />
    </>
  );

  const columns: ColumnDef<Subsidiary>[] = [
    {
      accessorKey: "name",
      cell: ({ getValue }) => (
        <Typography color="primary"> {getValue() as string} </Typography>
      ),
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

  return (
    <PageBody>
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
          formContent={({ closeModal, isLoading }) => (
            <AddSubsidiaryForm
              isLoading={isLoading}
              onSubmit={data => {
                handleSubmit(data, closeModal);
              }}
            />
          )}
        />
      </PageSection>
    </PageBody>
  );
}
