import CustodianProjectUser from "../../../../users/[id]/projects/[projectId]/[subTabId]/components";

interface PageProps {
  params: {
    id: number;
    userId: number;
  };
}

function CustodianProjectUserPage({
  params: { id: projectId, userId, ...rest },
}: PageProps) {
  return (
    <CustodianProjectUser projectId={projectId} userId={userId} {...rest} />
  );
}

export default CustodianProjectUserPage;
