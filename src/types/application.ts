import { FileStatus, FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { UserProfileCompletionCategories, UserGroup } from "@/consts/user";

interface File {
  id: number;
  name: string;
  status: keyof typeof FileStatus;
  type: keyof typeof FileType;
  created_at: string;
  updated_at: string;
}

interface Permission {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  enabled: number;
  pivot: {
    organisation_id: number;
    permission_id: number;
  };
}

interface Custodian {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  permissions: Permission[];
  unique_identifier: string;
  idvt_required: boolean;
}

type Approval = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  pivot: {
    organisation_id: number;
    custodian_id: number;
  };
};

interface CustodianUser {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  custodian_id: number;
  role: string;
}

interface UserProfileCompletionFields {
  name: string;
  required?: boolean;
}

type UserProfileCompletionSchema = Record<
  UserProfileCompletionCategories,
  {
    fields: UserProfileCompletionFields[];
  }
>;

type UserProfileCompletionJson = Record<
  UserProfileCompletionCategories,
  {
    score: number;
    fields: (UserProfileCompletionFields & {
      hasValue: boolean;
    })[];
  }
>;

interface User {
  id: number;
  registry_id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: UserGroup;
  permissions: Permission[];
  profile_completed_at: string | null;
  profile_steps_completed: string;
  approvals: Approval[];
  organisation_id: number;
  consent_scrape: boolean;
  orc_id: string | null;
  orcid_scanning: boolean;
  orcid_scanning_completed_at: string | null;
  registry: {
    files?: File[];
    organisations?: Organisation[];
    verified: boolean;
  };
}

interface OrganisationIdvt {
  idvt_result: boolean | null;
  idvt_completed_at: string;
  idvt_result_perc: number;
  idvt_errors: string;
}

interface Organisation extends OrganisationIdvt {
  companies_house_no: string;
  address_1: string;
  address_2: string;
  town: string;
  county: string;
  country: string;
  postcode: string;
  organisation_name: string;
  organisation_unique_id: string;
  dpo_name: string;
  dpo_email: string;
  hr_name: string;
  hr_email: string;
  id: number;
  permissions: Permission[];
  approvals: Approval[];
  lead_applicant_email: string;
  registries: {
    user: User;
  }[];
}

interface ResearcherEducation {
  institute_name: string;
  institute_address: string;
  from: string;
  to: string;
  title: string;
  institute_indentifier: string;
  source: string;
}

interface ResearcherAccreditation {
  awarded_at: string;
  awarding_body_name: string;
  awarding_body_ror: string;
  expires_at: string;
  title: string;
  awarded_locale: string;
}

interface ResearcherTraining {
  awarded_at: string;
  provider: string;
  awarding_body_ror: string;
  expires_at: string;
  training_name: string;
  expires_in_years: boolean;
}

interface ResearcherEmployment {
  department: string;
  role: string;
  is_current: boolean;
  from: string;
  to: string;
  employer_name: string;
  ror: string;
}

interface ResearcherEndorsement {
  comment: string;
  raised_against: number;
  reported_by: number;
}

interface ResearcherProjectApproval {
  project_id: number;
  custodian_id: number;
}

interface ResearcherProject {
  id: number;
  title: string;
  lay_summary: string;
  public_benefit: string;
  technical_summary: string;
  start_date: string;
  end_date: string;
  request_category_type: string;
  other_approval_committees: string;
  affiliate_id: number;
  unique_id: string;
  approvals: ResearcherProjectApproval[];
}

// to be filled when working
interface Employment {
  id: number;
}

interface Registry {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  verified: boolean;
  user: User;
  organisations: Organisation[];
  employment?: Employment;
}

interface Role {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

interface ProjectUser {
  project_id: number;
  user_digital_ident: string;
  project_role_id: number;
  registry: Registry;
  role: Role;
}

interface Auth {
  access_token: string;
  refresh_token: string;
  user: User;
  expires: number;
}

interface ApplicationDataState {
  routes: Record<
    keyof typeof ROUTES,
    {
      key: string;
      path: string;
    }
  >;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  systemConfigData: Record<string, any>;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type ApplicationSystemConfig = Record<string, any>;

export type {
  ApplicationDataState,
  ApplicationSystemConfig,
  Approval,
  Auth,
  Custodian,
  Organisation,
  OrganisationIdvt,
  User,
  ResearcherEducation,
  ResearcherAccreditation,
  ResearcherEmployment,
  ResearcherEndorsement,
  ResearcherTraining,
  ResearcherProject,
  ProjectUser,
  File,
  Permission,
  UserProfileCompletionSchema,
  CustodianUser,
  UserProfileCompletionJson,
  UserProfileCompletionFields,
};
