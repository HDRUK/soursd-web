"use client";

import { User } from "@/types/application";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { getUserApprovedProjects } from "@/services/projects";

interface OrganisationUserCardProps {
  user: User;
}

const NAMESPACE_TRANSLATIONS = "UsersList";

export default function OrganisationUserCard({
  user,
}: OrganisationUserCardProps) {
  const { first_name, last_name, id } = user;
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const { data: userApprovedProjects } = useQuery({
    queryKey: ["getUserApprovedProjects", id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUserApprovedProjects(id as string, {
        error: {
          message: "getUserApprovedProjectsError",
        },
      });
    },
    enabled: !!id,
  });

  const userProjectTitles = (() => {
    const titles = userApprovedProjects?.data?.map(project => project?.title);

    if (!titles || titles.length === 0) return "";

    return titles.length > 3
      ? `${titles.slice(0, 3).join(", ")} ...`
      : titles.join(", ");
  })();

  return (
    <Box sx={{ display: "flex", minWidth: "50%" }}>
      <div>
        <Typography variant="h6">
          {/* TODO: Users Job title needs to be added to this line once we have access to 'role' */}
          {first_name} {last_name}&nbsp;
        </Typography>
        <Typography variant="caption" color="grey">
          {userProjectTitles &&
            t("approvedOn", {
              projects: userProjectTitles,
            })}
        </Typography>
      </div>
    </Box>
  );
}
