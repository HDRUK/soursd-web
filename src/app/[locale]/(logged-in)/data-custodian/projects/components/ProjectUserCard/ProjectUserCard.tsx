"use client";

import { ProjectUser } from "@/types/application";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { getUserApprovedProjects } from "@/services/projects";

interface ProjectUserCardProps {
  projectUser: ProjectUser;
  projectTitle: string;
}

const NAMESPACE_TRANSLATIONS = "ProjectUserCard";

export default function ProjectUserCard({
  projectUser,
  projectTitle,
}: ProjectUserCardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { registry, role } = projectUser;
  const { user, organisations, employment } = registry;

  const { data: userApprovedProjects } = useQuery({
    queryKey: ["getUserApprovedProjects", user.id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUserApprovedProjects(id as string, {
        error: {
          message: "getUserApprovedProjectsError",
        },
      });
    },
    enabled: !!user.id,
  });

  const userProjectTitles = (() => {
    const titles = userApprovedProjects?.data
      ?.map(project => project?.title)
      .filter(title => title !== projectTitle);

    if (!titles || titles.length === 0) return "";

    return titles.length > 3
      ? `${titles.slice(0, 3).join(", ")} ...`
      : titles.join(", ");
  })();

  return (
    <Card
      sx={{ mb: 1 }}
      role="listitem"
      key={`card_${projectTitle}_user_${user.id}`}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            width: "100%",
            gap: {
              xs: 1,
              md: 2,
            },
            alignItems: {
              md: "center",
            },
          }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <div>
              <Typography variant="h6">
                {user?.first_name} {user?.last_name} [
                {employment?.role || t("notFound.employment")}]
              </Typography>

              <Typography>
                {organisations?.[0]?.organisation_name ??
                  t("notFound.organisation")}
              </Typography>

              <Typography variant="caption" color="grey">
                {role.name}
                {userProjectTitles && " | "}
                {userProjectTitles &&
                  t("alsoApprovedOn", {
                    projects: userProjectTitles,
                  })}
              </Typography>
            </div>
          </Box>
          <Box>
            {/*
            Buttons to go here... 
            */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
