import { UserSubTabs } from "../../../../consts/tabs";
import OrganisationUser from "./components";

interface PageProps {
  params: {
    id: number;
    subSubTabId: UserSubTabs;
  };
}

function OrganisationUserPage({
  params: { id: userId, subSubTabId },
}: PageProps) {
  return <OrganisationUser userId={userId} subSubTabId={subSubTabId} />;
}

export default OrganisationUserPage;
