import useGatewayProjectImport from "../../hooks/useGatewayProjectImport";
import { ProjectDetails } from "../../types/application";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const NAMESPACE_TRANSLATION_PROFILE = "Projects";

export interface ProjectImportProps {
  custodianId: number;
  projectId: number;
  isImportDisabled: boolean;
  onImported: (data: ProjectDetails) => void;
}

export default function ProjectImport({
  custodianId,
  projectId,
  isImportDisabled,
  onImported,
}: ProjectImportProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { handleImportData, ...importFromGatewayState } =
    useGatewayProjectImport();

  useEffect(() => {
    if (importFromGatewayState.data) {
      onImported(importFromGatewayState.data.data);
    }
  }, [importFromGatewayState.data]);

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<CloudDownloadOutlinedIcon />}
      onClick={() => {
        handleImportData({
          custodian_id: custodianId,
          project_id: projectId,
        });
      }}
      disabled={isImportDisabled}>
      {t("importFromHealthDataResearchGateway")}
    </Button>
  );
}
