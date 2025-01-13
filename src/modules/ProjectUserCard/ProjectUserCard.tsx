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
import { getUserApprovedProjects } from "@/services/projects";
import { useState, useCallback } from "react";
import { UserDetailsModal } from "@/modules";
import { EntityType } from "@/types/api";
import { getEntityApproval } from "@/services/approvals";
import { ApprovedUserIcon } from "@/consts/icons";
import Text from "@/components/Text";
import { useStore } from "@/data/store";

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
  const custodian = useStore(store => store.getCustodian());

  const { data: isApprovedData } = useQuery({
    queryKey: ["getUserHasCustodianApproval", user.id, custodian?.id],
    queryFn: () => {
      return getEntityApproval(EntityType.USER, user.id, custodian?.id, {
        error: {
          message: "getUserHasCustodianApprovalError",
        },
      });
    },
    enabled: !!custodian?.id,
  });

  const { data: userApprovedProjects } = useQuery({
    queryKey: ["getUserApprovedProjects", registry.id],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUserApprovedProjects(id as string, {
        error: {
          message: "getUserApprovedProjects",
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

          <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
            {isApprovedData?.data && (
              <Text
                iconSize="40px"
                startIcon={<ApprovedUserIcon />}
                component="span">
                {" "}
              </Text>
            )}

            <IconButton
              size="small"
              aria-label="Edit user"
              onClick={() =>
                setModalProps({
                  open: true,
                })
              }>
              <VisibilityIcon sx={{ color: "default.main", fontSize: 40 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      <UserDetailsModal
        {...modalProps}
        organisation={organisations[0]}
        isApproved={isApprovedData?.data || false}
        user={user}
        onClose={handleCloseModal}
      />
    </Card>
  );
}
