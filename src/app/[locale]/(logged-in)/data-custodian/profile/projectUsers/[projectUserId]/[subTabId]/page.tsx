import CustodianProjectUser from "./components/CustodianProjectUser";

interface PageProps {
  params: {
    id: number;
    projectUserId: number;
    subTabId: string;
  };
}

function CustodianProjectUserPage({
  params: { projectUserId, subTabId },
}: PageProps) {
  return (
    <CustodianProjectUser projectUserId={projectUserId} subTabId={subTabId} />
  );
}

export default CustodianProjectUserPage;
