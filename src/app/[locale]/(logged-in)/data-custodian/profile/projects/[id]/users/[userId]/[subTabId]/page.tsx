import CustodianProjectUser from "../../../../../users/[id]/projects/[projectId]/[subTabId]/components";

interface PageProps {
  params: {
    id: number;
    userId: number;
    subTabId: number;
  };
}

function CustodianProjectUserPage({
  params: { id: projectId, userId, subTabId },
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
