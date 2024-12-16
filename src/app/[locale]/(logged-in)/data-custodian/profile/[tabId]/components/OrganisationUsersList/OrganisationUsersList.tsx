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
  Icon,
  Table,
  TableBody,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserDetailsModal } from "@/modules";
import {
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
} from "@/consts/icons";
import { useStore } from "@/data/store";
import OrganisationUserCard from "../OrganisationUserCard";

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

  const getUserIcons = (user: User) => [
    {
      shouldRender: user.registry.verified && user.user_group === "USERS",
      icon: <IdentityVerifiedIcon fontSize="large" />,
    },
    {
      shouldRender: true, // TODO: Replace with proper logic
      icon: <ApprovedUserIcon fontSize="large" />,
    },
    {
      shouldRender: true, // TODO: Replace with proper logic
      icon: <ApprovedTrainingIcon fontSize="large" />,
    },
  ];

  return (
    <>
      <Table
        sx={{ tableLayout: "fixed" }}
        size="small"
        aria-label={t("tableSummary")}>
        <TableBody>
          {registries.map(({ user: { id, approvals }, user }) => {
            const userIcons = getUserIcons(user);

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
                      {userIcons.map(item =>
                        item.shouldRender ? (
                          item.icon
                        ) : (
                          <Icon fontSize="large" />
                        )
                      )}
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
                          {isApproved ? t("approved") : t("approve")}
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
