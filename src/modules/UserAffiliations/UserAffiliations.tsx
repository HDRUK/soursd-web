import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useStore } from "@/data/store";
import { Affiliations, PageBodyContainer, PageSection } from "@/modules";
import { usePaginatedAffiliations } from "@/services/affiliations";

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
    last_page,
    total,
    setPage,
    ...getAffiliationsQueryState
  } = usePaginatedAffiliations(user?.registry_id, {
    queryKeyBase: ["getProjects"],
  });

  return (
    <PageBodyContainer>
      <Typography variant="h2">{t("affiliations")}</Typography>
      <PageSection sx={{ my: 3 }}>
        <Affiliations
          setHistories={setHistories}
          getHistories={getHistories}
          affiliationsData={affiliationsData}
          getAffiliationsQueryState={getAffiliationsQueryState}
          last_page={last_page}
          total={total}
          setPage={setPage}
        />
      </PageSection>
    </PageBodyContainer>
  );
}
