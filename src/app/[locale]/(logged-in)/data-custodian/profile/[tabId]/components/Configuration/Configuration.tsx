import { useQuery } from "@tanstack/react-query";
import { getRules } from "@/services/rules";
import { Box } from "@mui/material";
import ListInfoItem from "@/components/ListInfoItem";
import { useTranslations } from "next-intl";
import { PageGuidance } from "@/modules";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";

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
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" gap={0} maxWidth={1000}>
          {rules?.data.nodes.map((node, index) => (
            <ListInfoItem key={`info-box-${node.name}`} index={index + 1}>
              {`${t(`${node.name}.title`)}: ${t(`${node.name}.description`)}`}
            </ListInfoItem>
          ))}
        </Box>
      </Box>
    </PageGuidance>
  );
};

export default Configuration;
