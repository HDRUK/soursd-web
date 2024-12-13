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
