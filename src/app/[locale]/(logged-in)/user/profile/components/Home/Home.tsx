import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { useTranslations } from "next-intl";
import ActionLogs from "@/modules/ActionLogs";
import SoursdCard from "@/components/SoursdCard";
import { mockedUserHomeIntro } from "@/mocks/data/cms";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Home() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { user } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <ActionLogs
            variant="user"
            panelProps={{
              heading: "Welcome to SOURSD",
              description: mockedUserHomeIntro,
            }}
          />
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <SoursdCard
            name={`${user?.first_name} ${user?.last_name}`}
            status={user?.model_state?.state.slug}
            identifier={user?.registry.digi_ident}
            description={tProfile("uniqueIdentifierCaption")}
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
