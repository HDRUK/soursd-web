"use client";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import ApprovalStatus from "@/components/ApprovalStatus";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { EntityType } from "@/types/api";
import { Organisation, User } from "@/types/application";
import { QueryState } from "@/types/form";
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
import { UserDetailsModal } from "@/modules";
import {
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
} from "@/consts/icons";

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

const CUSTODIAN_ID = 1;

export default function OrganisationUsersList({
  organisation,
  onApproveToggle,
  queryState,
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

  const getUserIcons = (user: User) => {
    const items = [
      {
        shouldRender: user.registry.verified && user.user_group === "USERS",
        icon: <IdentityVerifiedIcon />,
      },
      {
        // TODO: SPEEDI-615 - the shouldRender logic needs to be properly implemented here.
        shouldRender: true,
        icon: <ApprovedUserIcon />,
      },
      {
        // TODO: SPEEDI-615 - the shouldRender logic needs to be properly implemented here.
        shouldRender: true,
        icon: <ApprovedTrainingIcon />,
      },
    ];
    return items;
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
            <TableCell />
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
                ({ id: custodianId }) => custodianId === CUSTODIAN_ID
              );
              const userIcons = getUserIcons(user);
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
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    {userIcons.map(item =>
                      item.shouldRender ? item.icon : null
                    )}
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
                                custodian_id: CUSTODIAN_ID,
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
