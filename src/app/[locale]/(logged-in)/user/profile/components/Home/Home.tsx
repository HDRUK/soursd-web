import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { useTranslations } from "next-intl";
import ActionLogs from "@/modules/ActionLogs";

const NAMESPACE_TRANSLATION = "Profile";

export default function Home() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION);
  const { user } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody>
          <ActionLogs
            variant="user"
            panelProps={{
              heading: "Before you get started (5)",
              description: (
                <>
                  Welcome to Sourced! You’ll see a list of tasks below we’ve
                  assigned to you to complete your profile. To help you do that
                  as quickly as possible here’s a list of things you’ll need
                  before you dive in:
                  <ul>
                    <li>Prerequisite 1</li>
                    <li>Prerequisite 2</li>
                    <li>Prerequisite 3</li>
                  </ul>
                </>
              ),
            }}
          />
        </PageColumnBody>
        <PageColumnDetails>
          {user?.first_name} {user?.last_name}
          {user?.registry.digi_ident}
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
