import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import { useStore } from "@/data/store";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { Button, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Home() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { user, routes } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  const actions = [
    {
      heading: "Add your personal details",
      icon: <BadgeOutlinedIcon />,
      action: (
        <Button
          component={Link}
          href={routes.profileResearcherIdentity.path}>
          Get started
        </Button>
      ),
    },
    {
      heading: "Add your affiliations",
      icon: <BadgeOutlinedIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileResearcherAffiliations.path}>
          Add affiliations
        </Button>
      ),
    },
    {
      heading: "Add your training",
      icon: <BadgeOutlinedIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileResearcherTraining.path}>
          Add training
        </Button>
      ),
    },
    {
      heading: "Review your projects",
      icon: <BadgeOutlinedIcon />,
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileResearcherProjects.path}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <PageBodyContainer heading={tProfile("homeTitle")}>
      <PageColumns>
        <PageColumnBody>
          <PageBody>
            <ActionsPanel
              variant="plain"
              heading="Before you get started (5)"
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
          </PageBody>
        </PageColumnBody>
        <PageColumnDetails>
          {user?.first_name} {user?.last_name}
          {user?.registry.digi_ident}
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
