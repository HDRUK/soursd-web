import CustodianProjectUser from "./components";

interface PageProps {
  params: {
    id: number;
    userId: number;
  };
}

function CustodianProjectUserPage({
  params: { id: projectId, userId },
}: PageProps) {
  return <CustodianProjectUser projectId={projectId} userId={userId} />;
}

export default CustodianProjectUserPage;
