"use client";

import { ProjectUser } from "@/types/application";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import IconButton from "@/components/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getApprovedProjects } from "@/services/projects";
import { useState, useCallback } from "react";
import { UserDetailsModal } from "@/modules";

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

  // note: Calum - forcing the user to be approved, have made a ticket/note of this
  // - need the BE /projects/{id}/user to return to tell us if the user is approved for this project or not..
  // - https://hdruk.atlassian.net/browse/SPEEDI-607
  const isApproved = true;

  const { data: userApprovedProjects } = useQuery({
    queryKey: ["getApprovedProjects", registry.id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getApprovedProjects(id as string, {
        error: {
          message: "getApprovedProjects",
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

  const [modalProps, setModalProps] = useState<{ open: boolean }>({
    open: false,
  });

  const handleCloseModal = useCallback(() => {
    setModalProps({ open: false });
  }, []);

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
            justifyContent: "space-between",
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
            <IconButton
              size="small"
              aria-label="Edit user"
              onClick={() =>
                setModalProps({
                  open: true,
                })
              }>
              <VisibilityIcon sx={{ color: "default.main" }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      <UserDetailsModal
        {...modalProps}
        organisation={organisations[0]}
        isApproved={isApproved}
        user={user}
        onClose={handleCloseModal}
      />
    </Card>
  );
}
