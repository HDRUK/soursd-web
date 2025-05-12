import deleteApproval from "./deleteApproval";
import postApproval from "./postApproval";
import getEntityApproval from "./getEntityApproval";
import projectUserCustodianApproval from "./projectUserCustodianApproval";
import organisationCustodianApproval from "./organisationCustodianApproval";
import { getOrganisationApprovalQuery } from "./getOrganisationApprovalQuery";

export {
  postApproval,
  deleteApproval,
  getEntityApproval,
  projectUserCustodianApproval,
  organisationCustodianApproval,
  getOrganisationApprovalQuery,
};

export type * from "./types";
