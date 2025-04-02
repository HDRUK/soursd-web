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
import { useStore } from "@/data/store";
import SoursdCard from "@/components/SoursdCard";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const Home = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const organisation = useStore(state => state.getOrganisation());

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns lg={8}>
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
        <PageColumnDetails lg={4}>
          <SoursdCard
            name={organisation.organisation_name}
            status={organisation.model_state?.state.slug}
            identifier={organisation.organisation_unique_id}>
            {tProfile("uniqueIdentifierCaption")}
          </SoursdCard>
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
};

export default Home;
