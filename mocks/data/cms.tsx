import ChipStatus, { Status } from "@/components/ChipStatus";
import { Box, Typography } from "@mui/material";

export const mockedSafeProjectGuidanceProps = {
  infoTitle: "Did you know?",
  info: (
    <>
      <Typography>
        The project properties are following the data use register transparency
        standard.
      </Typography>
    </>
  ),
};

export const mockedPersonalDetailsGuidanceProps = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography variant="h3" mb={3}>
        Did you know?
      </Typography>
      <Typography mb={3}>
        If you have consented to SOURSD accessing public information via ORCiD,
        then this willalready be compiling a list of employment history for you!
      </Typography>
      <Typography mb={3}>
        Providing SOURSD with a full employment/affilitation history helps Data
        Custodian&apos;s better understand your suitability. Moreover, your
        employment history provides exposure to other research projects, as well
        as public benefit and impact. The more information you provide
        ultimately leads to a far simpler data access approval process.
      </Typography>
      <Typography>
        This section contains a list of the affiliations you’ve already told us
        about. This is your information, and you can edit/remove at any point.
      </Typography>
    </>
  ),
};

export const mockedResearcherAffiliationsGuidance = {
  infoTitle:
    "This section relates to you as an employee or student of an Organisation",
  info: (
    <>
      <Typography mb={3}>
        Through the SOURSD platform, individuals are affiliated with
        Organisations (employers or higher education institute).
      </Typography>
      <Typography mb={3}>
        If your particular employer or higher education institute isn’t known by
        SOURSD, then you can ask them to register for an account!
      </Typography>
      <Typography mb={5}>
        Affiliated Organisations that haven’t already confirmed your status will
        be sent an invite to do so, when you click save. You can also do this
        manually. Being affiliated by an Organisation is especially important
        for Organisations who are the host for a project you plan to work on.
      </Typography>
      <Typography variant="h4" mb={2}>
        The statuses
      </Typography>
      <ChipStatus status={Status.AFFILIATED} color="success" sx={{ mb: 2 }} />
      <Typography mb={3}>
        You have been affiliated by this Organisation
      </Typography>
      <ChipStatus status={Status.PENDING} sx={{ mb: 2 }} />
      <Typography mb={3}>
        The Organisation has been invited to confirm your affiliation, but has
        not yet done so. Once they have an account they will be automatically
        asked to confirm your affiliation
      </Typography>
      <ChipStatus status={Status.INVITE_SENT} sx={{ mb: 2 }} />
      <Typography>
        The Organisation has been invited to set up an account, but has not yet
        done so
      </Typography>
    </>
  ),
};

export const mockedCustodianIdvtInfoContent = (
  <>
    <Typography>
      IDVT tests an individual against the following criteria;
    </Typography>
    <ol>
      <li>Valid government issued identification. (Fraud)</li>
      <li>Likeness check against ID. (Identity)</li>
      <li>Liveness check. (Identity)</li>
      <li>Sanctions. (AML)</li>
    </ol>
    <Typography>
      This feature is supplied as part of SOURSD and is entirely up to you, as a
      Data Custodian, whether you want these additional security checks carried
      out, above and beyond what an employer would do.
    </Typography>
  </>
);
export const mockedSoursdHomepageInfo = {
  infoTitle: "SoursdInfo",
  info: (
    <>
      <Typography fontSize="48px" fontWeight="400" mb={1}>
        <Box component="span" fontWeight="bold">S</Box>afe{" "} 
        <Box component="span" fontWeight="bold">O</Box>rganisation and{" "}
        <Box component="span" fontWeight="bold">U</Box>ser{" "}
        <Box component="span" fontWeight="bold">R</Box>egistry for{" "}
        <Box component="span" fontWeight="bold">S</Box>ensitive{" "}
        <Box component="span" fontWeight="bold">D</Box>ata
      </Typography>
      <Typography variant="h1" fontWeight="normal" >
        A platform to enable Safe People decision making
      </Typography>
    </>
  ),
};

export const mockedSoursdHomepageUsages = {
  infoTitle: "SoursdUsages",
  infoHeader: (
    <>
      <Typography variant="h2" mb={2}>
        With SOURSD you can...
      </Typography>
    </>
  ),
};

export const mockedManageDelegatesGuidance = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography variant="h3" mb={3}>
        Did you know?
      </Typography>
      <Typography mb={5}>
        Organisation delegates are nominated administrative groups or
        individuals that vouch for Users employed by their organisation. A
        delegate could be a HR representative, DPO representative, Contracts
        representative or Legal representative.
      </Typography>
    </>
  ),
};

export const mockedRorIdInfo = (
  <>
    <Typography>
      Research Organisation Registry (ROR) identification.
    </Typography>
    <Typography>E.g. https://ror.org/01abcde11</Typography>
  </>
);

export const mockedOrganisationUsersIntro = `
  As a representative of an Organisation, you have been given permission
  to associate your affiliated Users (an employee or student of your
  Organisation) with your Organisation’s SOURSD account. Users are
  individuals involved in active research projects using sensitive data.
`;

export const mockedOrganisationBulkInviteIntro = `
  Add new affiliated Users to SOURSD. Individual Users will create a
  SOURSD account for themselves and will affiliate themselves with an
  Organisation.
`;

export const mockedDelegateAdministationDescription = (
  <>
    <Typography variant="subtitle1" fontSize="large" sx={{ pb: 1 }}>
      Senior Responsible Officer (SRO) contact information
    </Typography>
    <Typography>
      As a representative of your Organisation, you have been nominated as a
      Senior Responsible Officer (SRO), with sufficient seniority and relevant
      responsibility to nominate Delegates from your Organisation to affiliate
      your employees or students. As an SRO, You can provide your individual
      information here:
    </Typography>
  </>
);

export const mockedDelegateListDescription = (
  <>
    <Typography variant="subtitle1" fontSize="large" sx={{ pb: 1 }}>
      Organisation administrative Delegates
    </Typography>
    <Typography>
      As a Senior Responsible Officer (SRO) for your Organisation, you can
      invite nominated Delegates from your Organisation to create a SOURSD
      account. A Delegate could be a Human Resources (HR) representative,
      Information Governance representative e.g. Data Protection Officer (DPO) ,
      Contracts representative or Legal representative.You can invite nominated
      Delegates to register for a SOURSD account here:
    </Typography>
  </>
);

export const mockedEmployeeStudentAdminDescription = `
As a representative of an Organisation, you have been given permission to associate your affiliated users (an employee or student of your Organisation) with your Organisation’s SOURSD account. Users are individuals involved in active research projects using sensitive data. 

Individual users will create a SOURSD account for themselves and will affiliate themselves with an Organisation.

Automatically invite users to create a SOURSD account. Users will have one SOURSD account that will stay with them throughout their career. Select the user(s) you would like to invite to create a SOURSD account and select ‘Invite User to create a SOURSD account’ in the Actions below. 
`;

export const mockedWebhookDescription = (
  <Typography>
    SOURSD uses an exponential back-off mechanism to avoid missed callbacks. In
    the event of your server not returning an{" "}
    <strong>HTTP_OK (200) response</strong>, we will continuously try to re-send
    with increasing retry times, until we receive a{" "}
    <strong>HTTP_OK (200) response</strong>, or we reach our send cap.{" "}
    <Typography component="span" sx={{ color: "red" }}>
      We cannot resend events indefinitely. If we reach our retry cap, and the
      event is still unsent, it will be deleted.
    </Typography>
  </Typography>
);

export const mockedConfigurationRulesDescription = (
  <>
    <Typography mb={2}>
      SOURSD can be configured to flag if a certain property of a User or
      Organisation profile does not meet a set of individual Data Custodian
      "decision models" or criteria, supporting your decision making process.
      SOURSD does not make any decisions as to which Users or Organisations are
      considered "safe" - that decision remains with each Data Custodian.
    </Typography>
    <Typography mb={2}>
      A User or Organisation can still be approved by a Data Custodian to work
      on a particular project even if the User/Organisation is flagged as not
      meeting the requirements of a decision model.
    </Typography>
    <Typography mb={2}>
      Configure rules in line with your individual Trusted Research Environment
      or NHS Research Secure Data Environment policies or procedures below.
    </Typography>
  </>
);

export const mockedConfigurationRulesGuidanceProps = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography mb={5}>
        IDVT tests an individual against the following criteria:
      </Typography>
      <Typography mb={5}>
        <ol>
          <li>Valid government issued identification. (Fraud)</li>
          <li>Likeness check against ID. (Identity)</li>
          <li>Liveness check. (Identity)</li>
          <li>Sanctions. (AML)</li>
        </ol>
      </Typography>
      <Typography mb={5}>
        This feature is supplied as part of SOURSD and is entirely up to you, as
        a Data Custodian, whether you want these additional security checks
        carried out, above and beyond what an employer would do.
      </Typography>
    </>
  ),
};

export const mockedTermsAndConditions = {
  acceptingTerms: {
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Accepting Terms and Conditions
        </Typography>
        <Typography>
          By clicking on "Accept" below, you agree to the terms and conditions
          outlined on this page.
        </Typography>
      </>
    ),
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
    content: (
      <>
        <Typography variant="h5" gutterBottom>
          Liability Policy
        </Typography>
        <Typography>
          SOURSD is not liable for any loss, damage, or inconvenience caused by
          your use of the SOURSD product.
        </Typography>
      </>
    ),
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
