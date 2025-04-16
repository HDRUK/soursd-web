import Markdown from "@/components/Markdown";
import understandingContent from "./terms_and_conditions/business/1_understanding.md";
import researcherUsageContent from "./terms_and_conditions/business/2_usage_researcher.md";
import organisationUsageContent from "./terms_and_conditions/business/3_usage_org.md";
import custodianUsageContent from "./terms_and_conditions/business/4_usage_custodian.md";
import accountContent from "./terms_and_conditions/business/5_account.md";
import acceptableUseContent from "./terms_and_conditions/business/6_acceptable_use.md";
import intellectualPropertyContent from "./terms_and_conditions/business/7_intellectual_property.md";
import inputDataContent from "./terms_and_conditions/business/8_input_data.md";
import liabilityContent from "./terms_and_conditions/business/9_liability.md";
import disclaimersContent from "./terms_and_conditions/business/10_disclaimers.md";
import suspensionContent from "./terms_and_conditions/business/11_suspension.md";
import changesContent from "./terms_and_conditions/business/12_changes.md";
import thirdPartyContent from "./terms_and_conditions/business/13_third_party.md";
import otherContent from "./terms_and_conditions/business/14_other.md";
import lawContent from "./terms_and_conditions/business/15_law.md";
import contactContent from "./terms_and_conditions/business/16_contact.md";

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
