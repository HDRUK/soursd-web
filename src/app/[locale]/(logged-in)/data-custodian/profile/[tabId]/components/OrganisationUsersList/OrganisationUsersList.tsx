"use client";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { Organisation, User } from "@/types/application";
import { QueryState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserDetailsModal } from "@/modules";
import { useStore } from "@/data/store";
import OrganisationUserCard from "../OrganisationUserCard";
import UserIcons from "./UserIcons";

interface UsersListProps {
  organisation: Organisation;
  onApproveToggle(
    payload: PostApprovalPayloadWithEntity,
    isApproved: boolean
  ): void;
  queryState: QueryState;
}

interface ActiveUserData {
  user: User;
  organisation: Organisation;
  isApproved: boolean;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

export default function OrganisationUsersList({
  organisation,
  onApproveToggle,
  queryState,
}: UsersListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const [activeUserData, setActiveUserData] = useState<ActiveUserData | null>();

  const custodian = useStore(store => store.getCustodian());
  const { id: custodianId } = custodian || {};

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
        <TableBody>
          {registries.map(({ user: { id, approvals }, user, verified }) => {
            const isApproved =
              approvals?.filter(a => a.pivot.custodian_id === custodianId)
                .length > 0;
            return (
              <Card sx={{ mb: 1 }} role="listitem" key={`user_${id}`}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row",
                      },
                      width: "100%",
                      gap: {
                        xs: 1,
                        md: 2,
                      },
                      alignItems: {
                        md: "center",
                      },
                      justifyContent: "space-between",
                    }}>
                    <OrganisationUserCard user={user} />
                    <Box />
                    <Box />
                    <Box>
                      <UserIcons user={user} verified={verified} isApproved={isApproved}/>
                    </Box>
                    <ActionMenu aria-label={`${id} actions`}>
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
                          href={`${routes.permissionsResearcherCustodian.path}/${id}`}>
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
                            onApproveToggle(
                              {
                                type: EntityType.RESEARCHER,
                                user_id: id,
                                custodian_id: custodianId,
                              },
                              isApproved
                            )
                          }>
                          {isApproved ? t("unapprove") : t("approve")}
                        </LoadingButton>
                      </ActionMenuItem>
                    </ActionMenu>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </TableBody>
      </Table>
      {activeUserData && (
        <UserDetailsModal
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
