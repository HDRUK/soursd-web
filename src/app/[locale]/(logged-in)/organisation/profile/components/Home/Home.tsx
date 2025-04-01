import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import { useTranslations } from "next-intl";
import ActionLogs from "@/modules/ActionLogs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const Home = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody>
          <PageBody>
            <PageSection>
              <ActionLogs
                variant="organisation"
                panelProps={{
                  heading: "Welcome to SOURSD!",
                  description: (
                    <>
                      You’ll see a list of tasks below we’ve assigned to you to
                      complete your profile. To help you do that as quickly as
                      possible here’s a list of things you’ll need before you
                      dive in:
                      <ul>
                        <li>Prerequisite 1</li>
                        <li>Prerequisite 2</li>
                        <li>Prerequisite 3</li>
                      </ul>
                      <br />
                      It’s important for your Organisation to nominate and
                      confirm a SRO (Senior Responsible Officer). The SRO will
                      be required to get a declaration signed on behalf of their
                      Organisation and upload this. SOURSD contains information
                      about your employees and students and their work on
                      sensitive data projects. The SRO will be responsible for
                      verifying this information, it’s important that the SRO
                      has a position of seniority and can be held accountable
                      for the data.
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
    </PageBodyContainer>
  );
};

export default Home;
