import deleteApproval from "./deleteApproval";
import postApproval from "./postApproval";
import getEntityApproval from "./getEntityApproval";
import projectUserCustodianApproval from "./projectUserCustodianApproval";
import organisationCustodianApproval from "./organisationCustodianApproval";
import getOrganisationApprovalQuery from "./getOrganisationApprovalQuery";
import postOrganisationApprovalQuery from "./postOrganisationApprovalQuery";

export {
  postApproval,
  deleteApproval,
  getEntityApproval,
  projectUserCustodianApproval,
  organisationCustodianApproval,
  getOrganisationApprovalQuery,
  postOrganisationApprovalQuery,
};

export type * from "./types";
