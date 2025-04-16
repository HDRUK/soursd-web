import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import SafeProjectDetails from "@/modules/SafeProjectDetails";

export default function ProjectsSafeProject() {
  const project = useStore(state => state.getCurrentProject());

  return (
    <PageBody heading={`${project.title} (${project.unique_id})`}>
      <SafeProjectDetails projectData={project} />
    </PageBody>
  );
}
