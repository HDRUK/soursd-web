"use client";

import Mask from "@/components/Mask";
import { Message } from "@/components/Message";
import { QUERY_REFETCH_LONG_DELAY } from "@/consts/application";
import { useStore } from "@/data/store";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import {
  PageColumnLayout,
  PageColumnLayoutLeft,
  PageColumnLayoutRight,
} from "@/modules/PageColumnLayout";
import { getOrganisationIdvt } from "@/services/organisations";
import { getInitialsFromOrganisation } from "@/utils/user";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import CompanyValidatedStatus from "../CompanyValidatedStatus";

interface SectionsProps {
  children: ReactNode;
}

const NAMESPACE_TRANSLATIONS_PROFILE = "ProfileOrganisation";

export default function Sections({ children }: SectionsProps) {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const {
    data: organisationData,
    error: organisationStatusError,
    isError: isOrganisationStatusError,
  } = useQuery(["getOrganisationIdvt", 1], async () =>
    getOrganisationIdvt(1, {
      error: {
        message: "getOrganisationIdvtError",
      },
    })
  );

  const idvtResult = organisationData?.data.idvt_result;

  const {
    refetch: refetchOrganisationIdvt,
    cancel: refetchOrganisationIdvtCancel,
  } = useQueryRefetch({
    delay: QUERY_REFETCH_LONG_DELAY,
    options: { queryKey: ["getOrganisationIdvt", 1] },
  });

  useEffect(() => {
    refetchOrganisationIdvt();

    return () => {
      refetchOrganisationIdvtCancel();
    };
  }, []);

  useEffect(() => {
    if (idvtResult) refetchOrganisationIdvtCancel();
  }, [idvtResult]);

  if (!organisation) throw new Error(t("organisationNotFound"));

  const { organisation_name, companies_house_no } = organisation;

  const updatedOrganisation = organisationData?.data || organisation;

  return (
    <PageColumnLayout>
      <PageColumnLayoutLeft>
        <Mask width="160px" height="160px">
          {getInitialsFromOrganisation(organisation)}
        </Mask>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography fontWeight="bold">{organisation_name}</Typography>
          <Typography sx={{ mb: 2 }}>{companies_house_no}</Typography>
          {updatedOrganisation && (
            <CompanyValidatedStatus organisation={updatedOrganisation} />
          )}
          {isOrganisationStatusError && (
            <Message severity="error" sx={{ mb: 3 }} isDismissable>
              {t(organisationStatusError)}
            </Message>
          )}
        </Box>
      </PageColumnLayoutLeft>
      <PageColumnLayoutRight>{children}</PageColumnLayoutRight>
    </PageColumnLayout>
  );
}
