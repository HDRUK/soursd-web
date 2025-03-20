import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { ROUTES } from "@/consts/router";

type Route = Record<
  keyof typeof ROUTES,
  {
    path: string;
  }
>;

export interface ActionConfig {
  icon: React.ReactNode;
  path: string;
}

const generateActions = (routes: Route) => {
  return {
    profile_completed: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherIdentity.path,
    },
    affiliations_complete: {
      icon: <WorkOutlineIcon />,
      path: routes.profileResearcherAffiliations.path,
    },
    training_complete: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherTraining.path,
    },
    projects_review: {
      icon: <BadgeOutlinedIcon />,
      path: routes.profileResearcherProjects.path,
    },
  } as Record<string, ActionConfig>;
};

export default generateActions;
