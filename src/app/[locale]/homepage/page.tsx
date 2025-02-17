"use client";

import OverlayCenter from "@/components/OverlayCenter";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { Footer, Header } from "@/modules";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import KeyFeatures from "./components/KeyFeatures";
import SoursdInfo from "./components/SoursdInfo";
import SoursdUsages from "./components/SoursdUsages";
import Support from "./components/Support";
import { StyledWrapper } from "./homepage.styles";

const NAMESPACE_TRANSLATIONS = "Application";

export default function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { isReady, isAuthenticated, loading } = useLoginRedirect();

  return isReady && !isAuthenticated && !loading ? (
    <>
      <Header />
      <StyledWrapper>
        <section>
          <SoursdInfo />
        </section>
        <section>
          <SoursdUsages />
        </section>
        <section>
          <KeyFeatures />
        </section>
        <section>
          <Support />
        </section>
      </StyledWrapper>
      <Footer />
    </>
  ) : (
    <OverlayCenter variant="contained">
      <CircularProgress aria-label={t("loadingAriaLabel")} />
    </OverlayCenter>
  );
}
