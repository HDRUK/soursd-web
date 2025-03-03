import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import { OrganisationIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { Button } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Home = () => {
  const routes = useStore(state => state.getApplication().routes);

  const actions = [
    {
      heading: "Complete your Organisation name & address",
      icon: <OrganisationIcon />,
      action: (
        <Button
          component={Link}
          href={routes.profileCustodianConfiguration.path}>
          Get started
        </Button>
      ),
    },
    {
      heading: "Complete your organisation digital identifiers",
      icon: <OrganisationIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Complete this section
        </Button>
      ),
    },
    {
      heading: "Complete your sector, size & website details",
      icon: <OrganisationIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Complete this section
        </Button>
      ),
    },
    {
      heading: "Add your Organisation's UK subsidiaries",
      icon: <OrganisationIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Complete this section
        </Button>
      ),
    },
    {
      heading: "Complete your Organisation's data security compliance",
      icon: <OrganisationIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Complete this section
        </Button>
      ),
    },
    {
      heading:
        "Add a Senior Responsible Officer (SRO) and Delegates from your Organisation",
      icon: <ManageAccountsIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Add delegates
        </Button>
      ),
    },
    {
      heading: "Affiliate employees or students with your Organisation",
      icon: <ManageAccountsIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Add user
        </Button>
      ),
    },
  ];

  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <ActionsPanel
            description={
              <>
                Welcome to Sourced! You’ll see a list of tasks below we’ve
                assigned to you to complete your profile. To help you do that as
                quickly as possible here’s a list of things you’ll need before
                you dive in:
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
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails>
        <PageBody>SOURSD</PageBody>
      </PageColumnDetails>
    </PageColumns>
  );
};

export default Home;
