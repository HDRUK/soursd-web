import { Typography } from "@mui/material";

export const mockedPersonalDetailsGuidanceProps = {
  infoTitle: "Guidance",
  info: (
    <>
      <Typography variant="h3" mb={3}>
        Did you know?
      </Typography>
      <Typography mb={5}>
        If you have consented to SOURSD accessing public information via ORCiD,
        then this willalready be compiling a list of employment history for you!
      </Typography>
      <Typography mb={5}>
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
      <Typography variant="h1" mb={3}>
        Safe Organisation and User Registry for Sensitive Data (SOURSD)
      </Typography>
      <Typography variant="h5" fontWeight="light" sx={{ mt: "30px" }}>
        A centralised tool to enable Safe People decision making
      </Typography>
    </>
  ),
};

export const mockedSoursdHomepageUsages = {
  infoTitle: "SoursdUsages",
  infoHeader: (
    <>
      <Typography variant="h4" mb={3}>
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
    <Typography variant="subtitle1" fontSize="large" sx={{pb: 1}}>Senior Responsible Officer (SRO) contact information</Typography>
    <Typography>
      As a representative of your Organisation, you have been nominated as a Senior Responsible Officer (SRO), 
      with sufficient seniority and relevant responsibility to nominate Delegates from your Organisation to 
      affiliate your employees or students. As an SRO, You can provide your individual information here:
    </Typography>
  </>
);

export const mockedDelegateListDescription = (
  <>
    <Typography variant="subtitle1" fontSize="large" sx={{pb: 1}}>Organisation administrative Delegates</Typography>
    <Typography>
    As a Senior Responsible Officer (SRO) for your Organisation, you can invite nominated Delegates from your Organisation to create a SOURSD account.  
    A Delegate could be a Human Resources (HR) representative, Information Governance representative e.g. Data Protection Officer (DPO)
    , Contracts representative or Legal representative.You can invite nominated Delegates to register for a SOURSD account here:
    </Typography>
  </>
);

export const mockedEmployeeStudentAdminDescription = `
As a representative of an Organisation, you have been given permission to associate your affiliated users (an employee or student of your Organisation) with your Organisation’s SOURSD account. Users are individuals involved in active research projects using sensitive data. 

Individual users will create a SOURSD account for themselves and will affiliate themselves with an Organisation.

Automatically invite users to create a SOURSD account. Users will have one SOURSD account that will stay with them throughout their career. Select the user(s) you would like to invite to create a SOURSD account and select ‘Invite User to create a SOURSD account’ in the Actions below. 
`

export const mockedWebhookDescription = (
    <Typography>
    SOURSD uses an exponential back-off mechanism to avoid missed callbacks. 
    In the event of your server not returning an <strong>HTTP_OK (200) response</strong>, 
    we will continuously try to re-send with increasing retry times, until we receive a <strong>HTTP_OK 
    (200) response</strong>, or we reach our send cap. <Typography component="span" sx={{ color: 'red' }}>We cannot resend events indefinitely. 
    If we reach our retry cap, and the event is still unsent, it will be deleted.</Typography>
    </Typography>
);
