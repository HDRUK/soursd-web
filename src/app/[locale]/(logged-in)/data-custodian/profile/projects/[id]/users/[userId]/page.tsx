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
        <PageColumnBody lg={7}>Content!</PageColumnBody>
        <PageColumnDetails lg={5}>
          <CustodianProjectUser projectId={projectId} userId={userId} />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default CustodianProjectUserPage;
