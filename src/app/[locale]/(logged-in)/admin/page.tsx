import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections/Sections";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

function Page () {
    const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

    return (
        <DecoratorPage>
            <PageSection>
                <Typography variant="h4">{t("title")}</Typography>
            </PageSection>
            <PageSection>
                <Sections />
            </PageSection>
        </DecoratorPage>
    )
};

export default Page;
