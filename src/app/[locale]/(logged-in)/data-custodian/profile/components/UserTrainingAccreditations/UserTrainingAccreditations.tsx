import { useStore } from "@/data/store";
import { Training } from "@/modules";
import { EntityType } from "@/types/api";

export default function UserTrainingAccreditations() {
  const { custodian, user } = useStore(state => ({
    custodian: state.getCustodian(),
    // project: state.getProject(),
    user: state.getUser(),
  }));

  console.log("custodian", custodian);
  // console.log("project", project);
  console.log("user", user);
  return <Training variant={EntityType.CUSTODIAN} />;
}
