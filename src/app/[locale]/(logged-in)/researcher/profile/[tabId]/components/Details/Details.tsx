import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import PageGuidance from "@/modules/PageGuidance";
import { useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import Completion from "../Completion";
import UserInfo from "../UserInfo";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageGuidance
      title={tProfile("profile")}
      {...mockedPersonalDetailsGuidanceProps}>
      <UserInfo />
      <Completion />
    </PageGuidance>
  );
}
