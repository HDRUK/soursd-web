import Markdown from "@/components/Markdown";
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
  understanding: {
    content: <Markdown variant="legal">{understandingContent}</Markdown>,
  },
  researcherUsage: {
    content: <Markdown variant="legal">{researcherUsageContent}</Markdown>,
  },
  organisationUsage: {
    content: <Markdown variant="legal">{organisationUsageContent}</Markdown>,
  },
  custodianUsage: {
    content: <Markdown variant="legal">{custodianUsageContent}</Markdown>,
  },
  account: {
    content: <Markdown variant="legal">{accountContent}</Markdown>,
  },
  acceptableUse: {
    content: <Markdown variant="legal">{acceptableUseContent}</Markdown>,
  },
  intellectualProperty: {
    content: <Markdown variant="legal">{intellectualPropertyContent}</Markdown>,
  },
  inputData: {
    content: <Markdown variant="legal">{inputDataContent}</Markdown>,
  },
  liability: {
    content: <Markdown variant="legal">{liabilityContent}</Markdown>,
  },
  disclaimers: {
    content: <Markdown variant="legal">{disclaimersContent}</Markdown>,
  },
  suspension: {
    content: <Markdown variant="legal">{suspensionContent}</Markdown>,
  },
  changes: {
    content: <Markdown variant="legal">{changesContent}</Markdown>,
  },
  thirdParty: {
    content: <Markdown variant="legal">{thirdPartyContent}</Markdown>,
  },
  other: {
    content: <Markdown variant="legal">{otherContent}</Markdown>,
  },
  law: {
    content: <Markdown variant="legal">{lawContent}</Markdown>,
  },
  contact: {
    content: <Markdown variant="legal">{contactContent}</Markdown>,
  },
};
