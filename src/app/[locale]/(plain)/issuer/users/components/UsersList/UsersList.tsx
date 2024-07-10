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

interface UsersListProps {
  organisations: Organisation[];
}

export default function UsersList({ organisations }: UsersListProps) {
  const { routes } = useApplicationData();

  return (
    <>
      {organisations.map(({ organisation_name, registries, id }) => {
        const ariaId = organisation_name.replace(/[^\w]*/g, "");

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
                        Permissions
                      </Button>,
                      <Button size="small">Approve</Button>,
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
                    <TableCell>Email</TableCell>
                    <TableCell>First name</TableCell>
                    <TableCell>Last name</TableCell>
                    <TableCell sx={{ width: "40px" }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registries.map(
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
                                  Permissions
                                </Button>,
                                <Button size="small">Approve</Button>,
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
