import CustodianProjectUser from "./components";

interface PageProps {
  params: {
    id: number;
    projectId: number;
    subTabId: number;
  };
}

function CustodianProjectUserPage({
  params: { id: userId, projectId, subTabId },
}: PageProps) {
  return (
    <CustodianProjectUser
      projectId={projectId}
      userId={userId}
      subTabId={subTabId}
    />
  );
}

export default CustodianProjectUserPage;
