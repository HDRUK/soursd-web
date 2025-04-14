import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useStore } from "@/data/store";
import { Affiliations, PageBodyContainer, PageSection } from "@/modules";
import { useQuery } from "@tanstack/react-query";
import { getAffiliationsQuery } from "@/services/affiliations";

const NAMESPACE_TRANSLATION = "Application";

interface UserAffiliationsProps {
  userId: number;
}

export default function UserAffiliations({ userId }: UserAffiliationsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { data: affiliationsData, ...getAffiliationsQueryState } = useQuery(
    getAffiliationsQuery(userId)
  );

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("affiliations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Affiliations
          affiliationsData={affiliationsData}
          getAffiliationsQueryState={getAffiliationsQueryState}
        />
      </PageSection>
    </PageBodyContainer>
  );
}
