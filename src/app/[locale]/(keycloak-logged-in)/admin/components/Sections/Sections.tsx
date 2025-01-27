"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import SendInviteCustodian from "../SendInviteCustodian";
import SendInviteOrganisation from "../SendInviteOrganistion";
import SendInviteUser from "../SendInviteUser";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  const sections = [
    {
      name: "custodian",
      component: <SendInviteCustodian />,
    },
    {
      name: "organisation",
      component: <SendInviteOrganisation />,
    },
    {
      name: "user",
      component: <SendInviteUser />,
    },
  ];

  return (
    <>
      {sections.map(({ name, component }) => (
        <Accordion>
          <AccordionSummary
            id={`data-${name}-invite`}
            aria-controls={`data-${name}-invite-content`}
            expandIcon={<ArrowDropDownIcon />}>
            <Typography>{t(`${name}InviteTitle`)}</Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
