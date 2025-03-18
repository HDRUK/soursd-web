import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ProjectsSafeProjectForm from "../ProjectsSafeProjectForm";

export default function ProjectsSafeProject() {
  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <ProjectsSafeProjectForm queryState={{ isLoading: false }} />
    </PageGuidance>
  );
}
