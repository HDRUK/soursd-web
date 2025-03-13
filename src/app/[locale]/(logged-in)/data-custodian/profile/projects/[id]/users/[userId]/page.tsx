import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
} from "@/modules";
import CustodianProjectUser from "./components";

function CustodianProjectUserPage({ params: { id: projectId, userId } }) {
  return (
    <PageBodyContainer heading={"title!"}>
      <PageColumns>
        <PageColumnBody lg={8}>Content!</PageColumnBody>
        <PageColumnDetails lg={4}>
          <CustodianProjectUser projectId={projectId} userId={userId} />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default CustodianProjectUserPage;
