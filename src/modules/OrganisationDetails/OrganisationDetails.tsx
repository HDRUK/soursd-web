import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import { Box, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { filterFalsy } from "../../utils/array";
import { Organisation } from "../../types/application";
import Text from "../../components/Text";
import ApprovalStatus from "../../components/ApprovalStatus";

export interface OrganisationDetailsProps {
  isApproved: boolean;
  data: Organisation;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function OrganisationDetails({
  isApproved,
  data,
}: OrganisationDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const { address_1, address_2, town, county, country, postcode } = data;

  return (
    <div>
      <ApprovalStatus isApproved={isApproved}>
        <Typography variant="h6">{data.organisation_name}</Typography>
      </ApprovalStatus>
      <Text startIcon={<BusinessIcon />}>
        {t("companyNumberAbbr")}: {data.companies_house_no}
      </Text>
      <Text startIcon={<MailIcon />}>
        <Link href={`mailto: ${data.lead_applicant_email}`}>
          {data.lead_applicant_email}
        </Link>
      </Text>
      <Box sx={{ display: "flex" }}>
        <div>
          <LocationOnIcon />
        </div>
        <div>
          {filterFalsy([
            address_1,
            address_2,
            town,
            county,
            country,
            postcode,
          ]).map(text => (
            <div key={text}>{text}</div>
          ))}
        </div>
      </Box>
    </div>
  );
}
