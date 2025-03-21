import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import ActionLogs from "@/modules/ActionLogs";

const Home = () => {
  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <ActionLogs
            variant="organisation"
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
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails>
        <PageBody>SOURSD</PageBody>
      </PageColumnDetails>
    </PageColumns>
  );
};

export default Home;
