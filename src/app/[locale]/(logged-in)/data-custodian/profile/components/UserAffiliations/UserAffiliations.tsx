import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useStore } from "@/data/store";
import { Affiliations, PageBodyContainer, PageSection } from "@/modules";
import { useQuery } from "@tanstack/react-query";
import { getAffiliationsQuery } from "@/services/affiliations";

const NAMESPACE_TRANSLATION = "Application";

export default function UserAffiliations() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { user, setHistories, getHistories } = useStore(state => ({
    user: state.current.user,
    setHistories: state.setHistories,
    getHistories: state.getHistories,
  }));

  const {
    data: affiliationsData,
    ...getAffiliationsQueryState
  } = useQuery(getAffiliationsQuery(user?.registry_id));

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("affiliations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Affiliations
          setHistories={setHistories}
          getHistories={getHistories}
          affiliationsData={affiliationsData}
          getAffiliationsQueryState={getAffiliationsQueryState}
        />
      </PageSection>
    </PageBodyContainer>
  );
}
