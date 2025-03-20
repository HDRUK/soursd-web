import ActionsPanel, { ActionsPanelProps } from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { Button, Link, List, ListItem, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getActionLogsQuery } from "@/services/action_logs";
import { toCamelCase } from "@/utils/string";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import generateActions from "./config";

const NAMESPACE_TRANSLATION_PROFILE = "ActionLogs";

interface ActionLogProps {
  panelProps: Omit<ActionsPanelProps, "children">;
}

export default function ActionLogs({ panelProps }: ActionLogProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { user, routes } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  const { data: actionLogData } = useQuery(
    getActionLogsQuery(user?.id as number)
  );

  const completedActions =
    actionLogData?.data.filter(action => !!action.completed_at) || [];

  const inCompletedActions =
    actionLogData?.data.filter(action => !action.completed_at) || [];

  const actions = generateActions(routes) as ActionConfig;

  const hydratedInCompletedActions = inCompletedActions?.map(({ action }) => {
    const { icon, path } = actions[action as keyof typeof actions];

    const name = toCamelCase(action);
    return {
      heading: t(`${name}.title`),
      icon: icon,
      action: (
        <Button component={Link} variant="outlined" href={path}>
          {t(`${name}.buttonText`)}
        </Button>
      ),
    };
  });

  return (
    <>
      <PageBody>
        <ActionsPanel variant="plain" {...panelProps}>
          {hydratedInCompletedActions.map(action => (
            <ActionsPanelItem {...action} />
          ))}
        </ActionsPanel>
      </PageBody>
      <PageBody>
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            border: 0,
          }}>
          <AccordionSummary>
            <Typography variant="h3">Completed actions</Typography>
            <ExpandMoreIcon sx={{ ml: 2 }} />
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {completedActions.map(({ action, completed_at }, index) => (
                <ListItem key={index} disableGutters>
                  {!!completed_at && (
                    <CheckIcon
                      sx={{
                        mx: 1,
                        color: completed_at ? "success.main" : "gray",
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: completed_at ? "success.main" : "inherit",
                      textDecoration: !!completed_at ? "line-through" : "none",
                    }}>
                    {t(toCamelCase(`${action}.title`))}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </PageBody>
    </>
  );
}
