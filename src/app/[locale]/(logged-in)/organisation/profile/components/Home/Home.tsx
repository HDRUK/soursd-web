import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageContainer,
  PageSection,
} from "@/modules";
import { useTranslations } from "next-intl";
import ActionLogs from "@/modules/ActionLogs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const Home = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <PageSection>
            <ActionLogs
              variant="organisation"
              panelProps={{
                heading: "Before you get started (5)",
                description: (
                  <>
                    Welcome to Sourced! You’ll see a list of tasks below we’ve
                    assigned to you to complete your profile. To help you do
                    that as quickly as possible here’s a list of things you’ll
                    need before you dive in:
                    <ul>
                      <li>Prerequisite 1</li>
                      <li>Prerequisite 2</li>
                      <li>Prerequisite 3</li>
                    </ul>
                  </>
                ),
              }}
            />
          </PageSection>
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails>
        <PageBody>SOURSD</PageBody>
      </PageColumnDetails>
    </PageColumns>
  );
};

export default Home;
