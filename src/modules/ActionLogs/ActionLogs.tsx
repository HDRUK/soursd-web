import ActionsPanel, { ActionsPanelProps } from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import { getActionLogsQuery } from "@/services/action_logs";
import { ActionLogEntity } from "@/types/logs";
import { toCamelCase } from "@/utils/string";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, List, ListItem, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import PageBody from "@/modules/PageBody";
import generateActions, { ActionConfig } from "./utils";

const NAMESPACE_TRANSLATION_PROFILE = "ActionLogs";

interface ActionLogProps {
  variant: ActionLogEntity;
  panelProps: Omit<ActionsPanelProps, "children">;
}

export default function ActionLogs({ variant, panelProps }: ActionLogProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { routes, user } = useStore(state => ({
    routes: state.getApplication().routes,
    user: state.getUser(),
  }));

  const { id: entityId } = useStore(state => {
    switch (variant) {
      case "user":
        return { id: state.getUser()?.id || 1 };
      case "organisation":
        return { id: state.getOrganisation()?.id || 1 };
      case "custodian":
        return { id: state.getCustodian()?.id || 1 };
      default:
        return { id: 1 };
    }
  });
  const { data: actionLogData } = useQuery(
    getActionLogsQuery(entityId, variant)
  );

  const completedActions =
    actionLogData?.data.filter(action => !!action.completed_at) || [];

  const inCompletedActions =
    actionLogData?.data.filter(action => !action.completed_at) || [];

  const actions: Record<string, ActionConfig> = generateActions(routes);

  const hydratedInCompletedActions = inCompletedActions?.map(({ action }) => {
    const { icon, path } = actions[action as keyof typeof actions] ?? {};

    const name = toCamelCase(action);
    return {
      heading: t(`${name}.title`),
      description: t(`${name}.description`),
      icon,
      action: (
        <Button component={Link} variant="outlined" href={path}>
          {t(`${name}.buttonText`)}
        </Button>
      ),
    };
  });

  const isDelegate = user?.is_delegate;

  if (isDelegate) return <> </>;

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
            <Typography variant="h3">{t("completedActions")}</Typography>
            <ExpandMoreIcon sx={{ ml: 2 }} />
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {completedActions.map(({ id, action, completed_at }) => (
                <ListItem key={id} disableGutters>
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
                      textDecoration: completed_at ? "line-through" : "none",
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
