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
