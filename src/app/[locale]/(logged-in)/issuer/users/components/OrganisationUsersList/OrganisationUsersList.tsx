"use client";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import ApprovalStatus from "@/components/ApprovalStatus";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { Organisation, User } from "@/types/application";
import { FormMutateState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ResearcherDetailsModal from "../ResearcherDetailsModal";

interface UsersListProps {
  organisation: Organisation;
  onApproveToggle(
    payload: PostApprovalPayloadWithEntity,
    isApproved: boolean
  ): void;
  mutateState: FormMutateState;
}

interface ActiveUserData {
  user: User;
  organisation: Organisation;
  isApproved: boolean;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

const ISSUER_ID = 1;

export default function OrganisationUsersList({
  organisation,
  onApproveToggle,
  mutateState,
}: UsersListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const [activeUserData, setActiveUserData] = useState<ActiveUserData | null>();

  const { registries } = organisation;

  const handleViewResearcher = (data: ActiveUserData) => {
    setActiveUserData(data);
  };

  const handleCloseModal = () => {
    setActiveUserData(null);
  };

  return (
    <>
      <Table
        sx={{ tableLayout: "fixed" }}
        size="small"
        aria-label={t("tableSummary")}>
        <TableHead sx={{ background: grey["300"] }}>
          <TableRow>
            <TableCell>{t("emailHeading")}</TableCell>
            <TableCell>{t("firstNameHeading")}</TableCell>
            <TableCell>{t("lastNameHeading")}</TableCell>
            <TableCell sx={{ width: "50px" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {registries.map(
            ({
              user: { email, first_name, last_name, id, approvals },
              user,
            }) => {
              const isApproved = approvals.some(
                ({ id: issuerId }) => issuerId === ISSUER_ID
              );

              return (
                <TableRow key={email}>
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    <ApprovalStatus isApproved={isApproved}>
                      {email}
                    </ApprovalStatus>
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    {first_name}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    {last_name}
                  </TableCell>
                  <TableCell sx={{ pr: 0 }}>
                    <ActionMenu aria-label={`${email} actions`}>
                      <ActionMenuItem>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleViewResearcher({
                              isApproved,
                              user,
                              organisation,
                            })
                          }>
                          {t("viewDetails")}
                        </Button>
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          href={`${routes.permissionsResearcherIssuer.path}/${id}`}>
                          {t("permissions")}
                        </Button>
                      </ActionMenuItem>
                      <ActionMenuItem>
                        <LoadingButton
                          fullWidth
                          loading={mutateState.isLoading}
                          variant={isApproved ? "contained" : "outlined"}
                          color="success"
                          size="small"
                          onClick={() =>
                            onApproveToggle(
                              {
                                type: EntityType.RESEARCHER,
                                user_id: id,
                                issuer_id: ISSUER_ID,
                              },
                              isApproved
                            )
                          }>
                          {isApproved ? t("approved") : t("approve")}
                        </LoadingButton>
                      </ActionMenuItem>
                    </ActionMenu>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
      {activeUserData && (
        <ResearcherDetailsModal
          isApproved={activeUserData.isApproved}
          user={activeUserData.user}
          organisation={activeUserData.organisation}
          open={!!activeUserData}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
