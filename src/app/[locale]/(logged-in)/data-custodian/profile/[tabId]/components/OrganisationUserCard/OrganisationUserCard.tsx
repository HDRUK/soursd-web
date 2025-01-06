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
import { getEmployments } from "@/services/employments";

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
    queryKey: ["getApprovedProjects", id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUserApprovedProjects(id as string, {
        error: {
          message: "getApprovedProjectsError",
        },
      });
    },
    enabled: !!id,
  });

  const { data: userEmployments } = useQuery({
    queryKey: ["getEmployments", id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getEmployments(id as number, {
        error: {
          message: "getEmploymentsError",
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

  const userJobTitles = (() => {
    const titles = userEmployments?.data?.map(role => role?.role);

    if (!titles || titles.length === 0) return "";

    return `[${titles.join(", ")}]`
  })

  return (
    <Box sx={{ display: "flex", minWidth: "50%" }}>
      <div>
        <Typography variant="h6">
          {first_name} {last_name}&nbsp; {userJobTitles()}
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
