import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import SafeProjectDetails from "@/modules/SafeProjectDetails";

export default function ProjectsSafeProject() {
  const project = useStore(state => state.getProject());

  return (
    <PageBody heading={project.title}>
      <SafeProjectDetails projectData={project} />
    </PageBody>
  );
}
