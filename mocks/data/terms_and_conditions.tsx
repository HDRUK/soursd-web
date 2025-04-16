import Markdown from "@/components/Markdown";
import { Typography } from "@mui/material";

import understandingContent from "./terms/business/1_understanding.md";
import researcherUsageContent from "./terms/business/2_usage_researcher.md";
import organisationUsageContent from "./terms/business/3_usage_org.md";
import custodianUsageContent from "./terms/business/4_usage_custodian.md";
import accountContent from "./terms/business/5_account.md";
import acceptableUseContent from "./terms/business/6_acceptable_use.md";
import intellectualPropertyContent from "./terms/business/7_intellectual_property.md";
import inputDataContent from "./terms/business/8_input_data.md";
import liabilityContent from "./terms/business/9_liability.md";
import disclaimersContent from "./terms/business/10_disclaimers.md";
import suspensionContent from "./terms/business/11_suspension.md";
import changesContent from "./terms/business/12_changes.md";
import thirdPartyContent from "./terms/business/13_third_party.md";
import otherContent from "./terms/business/14_other.md";
import lawContent from "./terms/business/15_law.md";
import contactContent from "./terms/business/16_contact.md";

export const mockedTermsAndConditions = {
  acceptingTerms: {
    content: <Markdown variant="legal">{understandingContent}</Markdown>,
  },
  changesToTerms: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Changes to Terms and Conditions
        </Typography>
        <Typography>
          The terms and conditions for SOURSD may change from time to time.
          Please review the latest version before using our product.
        </Typography>
      </>
    ),
  },
  usingOurProduct: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Using Our Product
        </Typography>
        <Typography>
          The SOURSD product is designed to help you manage your sensitive data
          more effectively.
        </Typography>
      </>
    ),
  },
  generalRestrictions: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          General Restrictions
        </Typography>
        <Typography>
          SOURSD is not a replacement for professional legal advice. You should
          consult with a qualified legal professional before using the product.
        </Typography>
      </>
    ),
  },
  contentPolicy: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Content Policy
        </Typography>
        <Typography>
          SOURSD collects and stores personal data in accordance with the
          General Data Protection Regulation (GDPR) and other relevant data
          protection regulations. The data collected includes your name, email
          address, research project details, and affiliated Users' details.
        </Typography>
      </>
    ),
  },
  yourRights: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Your Rights
        </Typography>
        <Typography>
          You have the right to access, correct, update, or delete your personal
          data. You also have the right to object to processing your data. You
          can exercise your rights under the GDPR by contacting the GDPR data
          protection officer.
        </Typography>
      </>
    ),
  },
  copyrightPolicy: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Copyright Policy
        </Typography>
        <Typography>
          SOURSD is protected by copyright law and other intellectual property
          rights. The SOURSD logo and any other trademarks or service marks used
          on this website are owned by the SOURSD team.
        </Typography>
      </>
    ),
  },
  relationshipGuidelines: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Relationship Guidelines
        </Typography>
        <Typography>
          SOURSD encourages users to establish trust and relationships with each
          other. By creating a SOURSD account, you are agreeing to the SOURSD
          relationship guidelines.
        </Typography>
      </>
    ),
  },
  liabilityPolicy: {
    content: <Markdown variant="legal">{liabilityContent}</Markdown>,
  },
  generalLegalTerms: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          General Legal Terms
        </Typography>
        <Typography>
          These terms and conditions are governed by the laws of the United
          Kingdom. If you have any questions or concerns about these terms and
          conditions, please contact our support team at [support@soursd.com].
        </Typography>
      </>
    ),
  },
};
