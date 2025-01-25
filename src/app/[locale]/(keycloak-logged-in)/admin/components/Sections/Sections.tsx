"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import SendInviteCustodian from "../SendInviteCustodian";
import SendInviteOrganisation from "../SendInviteOrganistion";

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  return (
    <>
      <Accordion>
        <AccordionSummary
          id="data-custodian-invite"
          aria-controls="data-custodian-invite-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("custodianInviteTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SendInviteCustodian />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          id="system-config"
          aria-controls="system-config-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("systemConfigTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("systemConfigBody")}</Typography>
          <Typography variant="subtitle2">
            {t("systemConfigSubtitle")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          id="invite-organisation"
          aria-controls="invite-organisation-content"
          expandIcon={<ArrowDropDownIcon />}>
          <Typography>{t("inviteOrganisationTitle")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SendInviteOrganisation />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
