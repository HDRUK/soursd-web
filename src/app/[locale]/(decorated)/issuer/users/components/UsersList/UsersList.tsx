"use client";

import AccordionTitle from "@/components/AccordionTitle";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import Text from "@/components/Text";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { Organisation } from "@/services/organisations";
import { EntityType } from "@/types/api";
import { FormMutateState } from "@/types/form";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import VerifiedIcon from "@mui/icons-material/Verified";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslations } from "next-intl";

interface UsersListProps {
  organisations: Organisation[];
  onApprove(payload: PostApprovalPayloadWithEntity): void;
  onUnapprove(payload: PostApprovalPayloadWithEntity): void;
  mutateState: FormMutateState;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

const ISSUER_ID = 1;

export default function UsersList({
  organisations,
  onApprove,
  onUnapprove,
  mutateState,
}: UsersListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);

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

  const filteredOrganisations = organisations.map(organisation => ({
    ...organisation,
    registries: organisation.registries.filter(({ user }) => user),
  }));

  return (
    <>
      {filteredOrganisations.map(
        ({ organisation_name, registries, id, approvals }) => {
          const ariaId = organisation_name.replace(/[^\w]*/g, "");

          const isOrganisationApproved = !!approvals.find(
            ({ id: issuerId }) => issuerId === ISSUER_ID
          );

          return (
            <Accordion key={organisation_name}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${ariaId}-content`}
                id={`${ariaId}-header`}>
                <AccordionTitle
                  icon={<BusinessIcon />}
                  actions={
                    <ActionMenu
                      aria-label={`${organisation_name} actions`}
                      items={[
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          href={`${routes.permissionsOrganisationIssuer.path}/${id}`}>
                          {t("permissions")}
                        </Button>,
                        <LoadingButton
                          fullWidth
                          loading={mutateState.isLoading}
                          variant={
                            isOrganisationApproved ? "contained" : "outlined"
                          }
                          color="success"
                          size="small"
                          onClick={() =>
                            handleApproveClick(
                              {
                                type: EntityType.ORGANISATION,
                                organisation_id: id,
                                issuer_id: ISSUER_ID,
                              },
                              isOrganisationApproved
                            )
                          }>
                          {isOrganisationApproved
                            ? t("approved")
                            : t("approve")}
                        </LoadingButton>,
                      ]}
                    />
                  }>
                  <Text
                    endIcon={
                      isOrganisationApproved ? (
                        <VerifiedIcon color="success" titleAccess="Approved" />
                      ) : (
                        <NewReleasesIcon
                          color="warning"
                          titleAccess="Not approved"
                        />
                      )
                    }>
                    {organisation_name}
                  </Text>
                </AccordionTitle>
              </AccordionSummary>
              <AccordionDetails>
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
                      }) => {
                        const isApproved = !!approvals.find(
                          ({ id: issuerId }) => issuerId === ISSUER_ID
                        );

                        return (
                          <TableRow key={email}>
                            <TableCell sx={{ wordBreak: "break-word" }}>
                              <Text
                                endIcon={
                                  isApproved ? (
                                    <VerifiedIcon
                                      color="success"
                                      titleAccess="Approved"
                                    />
                                  ) : (
                                    <NewReleasesIcon
                                      color="warning"
                                      titleAccess="Not approved"
                                    />
                                  )
                                }>
                                {email}
                              </Text>
                            </TableCell>
                            <TableCell sx={{ wordBreak: "break-word" }}>
                              {first_name}
                            </TableCell>
                            <TableCell sx={{ wordBreak: "break-word" }}>
                              {last_name}
                            </TableCell>
                            <TableCell sx={{ pr: 0 }}>
                              <ActionMenu
                                aria-label={`${email} actions`}
                                items={[
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    href={`${routes.permissionsResearcherIssuer.path}/${id}`}>
                                    {t("permissions")}
                                  </Button>,
                                  <LoadingButton
                                    fullWidth
                                    loading={mutateState.isLoading}
                                    variant={
                                      isApproved ? "contained" : "outlined"
                                    }
                                    color="success"
                                    size="small"
                                    onClick={() =>
                                      handleApproveClick(
                                        {
                                          type: EntityType.RESEARCHER,
                                          user_id: id,
                                          issuer_id: ISSUER_ID,
                                        },
                                        isApproved
                                      )
                                    }>
                                    {isApproved ? t("approved") : t("approve")}
                                  </LoadingButton>,
                                ]}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          );
        }
      )}
    </>
  );
}
