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
