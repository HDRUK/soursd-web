import { Link } from "@mui/material";
import { Organisation } from "../../types/application";
import FieldsToText from "../../components/FieldsToText";

interface OrganisationsSectorWebsiteDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations";

export default function OrganisationsSectorWebsiteDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsSectorWebsiteDetailsProps) {
  return (
    <FieldsToText
      data={organisationData}
      keys={[
        {
          column_id: "sector.name",
          heading: "sectorName",
        },
        "organisation_size",
        {
          column_id: "website",
          content: (
            <Link href={organisationData.website} target="_blank">
              {organisationData.website}
            </Link>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
