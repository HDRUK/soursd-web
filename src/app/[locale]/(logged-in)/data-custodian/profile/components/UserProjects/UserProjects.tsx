import { useStore } from "@/data/store";
import Projects from "@/modules/Projects";

export default function UserTrainingAccreditation() {
  const user = useStore(state => state.getCurrentUser());

  return <Projects variant="user" entityId={user.id} />;
}
