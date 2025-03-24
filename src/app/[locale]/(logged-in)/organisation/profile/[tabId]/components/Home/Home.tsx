import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";

const Home = () => {
  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <PageSection>
            <ActionsPanel
              description={
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
              }>
              {actions.map(action => (
                <ActionsPanelItem {...action} />
              ))}
            </ActionsPanel>
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
