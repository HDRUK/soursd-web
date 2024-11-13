"use client";

import AccordionTitle from "@/components/AccordionTitle";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import Text from "@/components/Text";
import { useApplicationData } from "@/context/ApplicationData";
import { Organisation } from "@/services/organisations";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Link,
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
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

export default function UsersList({ organisations }: UsersListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);

  return (
    <>
      {organisations.map(({ organisation_name, registries, id }) => {
        const ariaId = organisation_name.replace(/[^\w]*/g, "");
        const filteredRegistriesByUser = registries.filter(
          ({ user }) => !!user
        );

        return (
          <Accordion>
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
                        size="small"
                        href={`${routes.permissionsOrganisationIssuer.path}/${id}`}>
                        {t("permissions")}
                      </Button>,
                      <Button size="small"> {t("approve")}</Button>,
                    ]}
                  />
                }>
                <Text
                  endIcon={
                    <VerifiedIcon color="success" titleAccess="Approved" />
                  }>
                  {organisation_name}
                </Text>
              </AccordionTitle>
            </AccordionSummary>
            <AccordionDetails>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table">
                <TableHead sx={{ background: grey["300"] }}>
                  <TableRow>
                    <TableCell>{t("emailHeading")}</TableCell>
                    <TableCell>{t("firstNameHeading")}</TableCell>
                    <TableCell>{t("lastNameHeading")}</TableCell>
                    <TableCell sx={{ width: "40px" }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRegistriesByUser.map(
                    ({ user: { email, first_name, last_name, id } }) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Text
                              endIcon={
                                <NewReleasesIcon
                                  color="warning"
                                  titleAccess="Not approved"
                                />
                              }>
                              {email}
                            </Text>
                          </TableCell>
                          <TableCell>{first_name}</TableCell>
                          <TableCell>{last_name}</TableCell>
                          <TableCell sx={{ pr: 0 }}>
                            <ActionMenu
                              aria-label={`${email} actions`}
                              items={[
                                <Button
                                  size="small"
                                  component={Link}
                                  href={`${routes.permissionsResearcherIssuer.path}/${id}`}>
                                  {t("permissions")}
                                </Button>,
                                <Button size="small"> {t("approve")}</Button>,
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
      })}
    </>
  );
}
