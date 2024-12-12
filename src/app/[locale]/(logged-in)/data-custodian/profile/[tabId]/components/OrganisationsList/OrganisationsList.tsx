"use client";

import AccordionTitle from "@/components/AccordionTitle";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import ApprovalStatus from "@/components/ApprovalStatus";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { Organisation } from "@/services/organisations";
import { EntityType } from "@/types/api";
import { QueryState } from "@/types/form";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import OrganisationDetailsModal from "../OrganisationDetailsModal";
import OrganisationUsersList from "../OrganisationUsersList";

interface UsersListProps {
  organisations: Organisation[];
  onApprove(payload: PostApprovalPayloadWithEntity): void;
  onUnapprove(payload: PostApprovalPayloadWithEntity): void;
  queryState: QueryState;
}

interface ActiveOrganisationData {
  organisation: Organisation;
  isApproved: boolean;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

const CUSTODIAN_ID = 1;

export default function UsersList({
  organisations,
  onApprove,
  onUnapprove,
  queryState,
}: UsersListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const [activeData, setActiveData] = useState<ActiveOrganisationData | null>(
    null
  );

  const handleApproveClick = (
    payload: PostApprovalPayloadWithEntity,
    isApproved: boolean
  ) => {
    if (!isApproved) {
      onApprove(payload);
    } else {
      onUnapprove(payload);
    }
  };

  const handleViewResearcher = (data: ActiveOrganisationData) => {
    setActiveData(data);
  };

  const handleCloseModal = () => {
    setActiveData(null);
  };

  const filteredOrganisations = organisations.map(organisation => ({
    ...organisation,
    registries: organisation.registries.filter(({ user }) => user),
  }));

  return (
    <>
      {filteredOrganisations.map(organisation => {
        const { organisation_name, id, approvals } = organisation;

        const ariaId = organisation_name.replace(/[^\w]*/g, "");

        const isApproved = approvals.some(
          ({ id: custodianId }) => custodianId === CUSTODIAN_ID
        );

        return (
          <>
            <Accordion key={organisation_name}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${ariaId}-content`}
                id={`${ariaId}-header`}>
                <AccordionTitle
                  icon={<BusinessIcon />}
                  actions={
                    <ActionMenu aria-label={`${organisation_name} actions`}>
                      <ActionMenuItem>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleViewResearcher({ organisation, isApproved })
                          }>
                          {t("viewDetails")}
                        </Button>
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          href={`${routes.permissionsOrganisationCustodian.path}/${id}`}>
                          {t("permissions")}
                        </Button>
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <LoadingButton
                          fullWidth
                          loading={queryState.isLoading}
                          variant={isApproved ? "contained" : "outlined"}
                          color="success"
                          size="small"
                          onClick={() =>
                            handleApproveClick(
                              {
                                type: EntityType.ORGANISATION,
                                organisation_id: id,
                                custodian_id: CUSTODIAN_ID,
                              },
                              isApproved
                            )
                          }>
                          {isApproved ? t("approved") : t("approve")}
                        </LoadingButton>
                      </ActionMenuItem>
                    </ActionMenu>
                  }>
                  <ApprovalStatus isApproved={isApproved}>
                    {organisation_name}
                  </ApprovalStatus>
                </AccordionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <OrganisationUsersList
                  queryState={queryState}
                  organisation={organisation}
                  onApproveToggle={handleApproveClick}
                />
              </AccordionDetails>
            </Accordion>
            {activeData && (
              <OrganisationDetailsModal
                organisation={activeData.organisation}
                isApproved={activeData.isApproved}
                open={!!activeData}
                onClose={handleCloseModal}
              />
            )}
          </>
        );
      })}
    </>
  );
}
