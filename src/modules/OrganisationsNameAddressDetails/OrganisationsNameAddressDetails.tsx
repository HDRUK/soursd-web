import FieldsToText from "@/components/FieldsToText";
import { Organisation } from "@/types/application";
import { Typography } from "@mui/material";

interface OrganisationsNameAddressDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations.NameAddress";

export default function OrganisationsNameAddressDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsNameAddressDetailsProps) {
  return (
    <FieldsToText
      data={organisationData}
      keys={[
        "organisation_name",
        {
          column_id: "address",
          content: (
            <Typography>
              {[
                "address_1",
                "address_2",
                "town",
                "county",
                "country",
                "postcode",
              ].map(key => (
                <div>{organisationData[key]}</div>
              ))}
            </Typography>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
