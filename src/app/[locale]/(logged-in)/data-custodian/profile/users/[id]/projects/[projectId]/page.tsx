import CustodianProjectUser from "./components";

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
    <b>
      {" "}
      {projectId} {userId}{" "}
    </b>
  );

  return (
    <CustodianProjectUser
      projectId={projectId}
      userId={userId}
      subTabId={subTabId}
    />
  );
}

export default CustodianProjectUserPage;
