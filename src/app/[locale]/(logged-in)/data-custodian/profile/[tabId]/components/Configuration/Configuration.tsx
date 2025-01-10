import { useQuery } from "@tanstack/react-query";
import { getRules } from "@/services/rules";
import { Box } from "@mui/material";
import InfoBox from "@/components/InfoBox";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_RULES = "Rules";

const Configuration = () => {
  const t = useTranslations(NAMESPACE_TRANSLATION_RULES);
  const { data: rules } = useQuery({
    queryKey: ["getUserApprovedProjects"],
    queryFn: () =>
      getRules({
        error: {
          message: "getUserApprovedProjectsError",
        },
      }),
  });
  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Box display="flex" flexDirection="column" gap={0} maxWidth={1000}>
        {rules?.data.nodes.map((node, index) => (
          <InfoBox key={`info-box-${node.name}`} index={index + 1}>
            {`${t(`${node.name}.title`)}: ${t(`${node.name}.description`)}`}
          </InfoBox>
        ))}
      </Box>
    </Box>
  );
};

export default Configuration;
