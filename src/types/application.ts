import { FileStatus, FileType } from "@/consts/files";
import {
  UserFeedSource,
  UserGroup,
  UserProfileCompletionCategories,
} from "@/consts/user";

interface File {
  id: number;
  name: string;
  status: keyof typeof FileStatus;
  type: keyof typeof FileType;
  created_at: string;
  updated_at: string;
}

interface Sector {
  name: string;
  id: string;
}

interface Permission {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  enabled: boolean;
  pivot?: {
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

interface UserPermission {
  custodian_user_id: number;
  permission_id: number;
  permission: Permission;
}

interface CustodianUser {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  custodian_id: number;
  user_permissions: UserPermission[];
}

interface UserProfileCompletionFields {
  name: string;
  required?: boolean;
}

type UserProfileCompletionSchema = Record<
  UserProfileCompletionCategories,
  UserProfileCompletionFields[]
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

interface Auth {
  email: string;
}

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
  organisation_id?: number | null;
  custodian_id?: number;
  custodian_user_id?: number;
  consent_scrape: boolean;
  orc_id: string | null;
  orcid_scanning: boolean;
  orcid_scanning_completed_at: string | null;
  created_at: string;
  feed_source?: UserFeedSource;
  unclaimed?: boolean;
  registry: {
    digi_ident: string;
    files?: File[];
    organisations?: Organisation[];
    verified: boolean;
    training?: ResearcherTraining[];
  };
  is_delegate: number;
  departments?: Department[];
  role?: string;
  location?: string;
  status: "invited" | "registered";
}
interface AddressFields {
  postcode?: string;
  address_1?: string;
  address_2?: string | null;
  town?: string;
  county?: string;
  country?: string;
}

interface Subsidiary extends AddressFields {
  id?: number;
  name: string;
  pivot?: {
    organisation_id: number;
    subsidiary_id: number;
  };
}

interface Charity extends AddressFields {
  id: number;
  registration_id: string;
  name: string;
  website?: string;
}

interface OrganisationIdvt {
  idvt_result: boolean | null;
  idvt_completed_at: string;
  idvt_result_perc: number;
  idvt_errors: string;
}

interface Organisation extends OrganisationIdvt, AddressFields {
  companies_house_no: string;
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
  lead_applicant_organisation_name: string;
  sector_id: number;
  charities: Charity[];
  ror_id: string;
  website: string;
  smb_status: boolean;
  registries: {
    user: User;
    verified: boolean;
  }[];
  ce_certified: boolean;
  ce_certification_num: string;
  ce_expiry_date: string;
  ce_plus_certified: boolean;
  ce_plus_certification_num: string;
  ce_plus_expiry_date: string;
  iso_27001_certified: boolean;
  iso_27001_certification_num: string;
  iso_expiry_date: string;
  dsptk_certified: boolean;
  dsptk_ods_code: string;
  dsptk_expiry_date: string;
  subsidiaries?: Subsidiary[];
  departments: Department[];
  unclaimed: number;
  organisation_size?: number;
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

interface ResearcherProfessionalRegistration {
  id: number;
  name: string;
  member_id: string;
}

interface ResearcherAccreditation {
  id: number;
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
  id: number;
  certification_id: number | null;
}

interface ResearcherEmployment {
  id: number | string;
  department: string;
  role: string;
  is_current: boolean;
  from: string;
  to: string;
  employer_name: string;
  ror: string;
}

interface ResearcherEndorsement {
  id: number;
  comment: string;
  raised_against: number;
  reported_by: number;
}

interface ResearcherAffiliation {
  id: number;
  member_id: string;
  organisation_id: number;
  relationship?: string;
  current_employer: boolean;
  start_date?: string;
  end_date?: string;
  position?: string;
  organisation: {
    organisation_name: string;
  };
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

interface Registry {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  verified: boolean;
  user: User;
  organisations: Organisation[];
  employment?: ResearcherEmployment;
  education: ResearcherEducation[];
  training: ResearcherTraining[];
  accreditations: ResearcherAccreditation[];
  professionalRegistrations: ResearcherProfessionalRegistration[];
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
  primary_contact: number;
}

interface Department {
  category: string;
  created_at: string;
  id: number;
  name: string;
  pivot: {
    organisation_id: number;
    department_id: number;
  };
  updated_at: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type SystemConfig = Record<string, any>;

export type {
  AddressFields,
  Approval,
  Auth,
  Custodian,
  CustodianUser,
  Charity,
  Department,
  File,
  Organisation,
  OrganisationIdvt,
  Permission,
  ProjectUser,
  ResearcherAccreditation,
  ResearcherAffiliation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherEndorsement,
  ResearcherProfessionalRegistration,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  Subsidiary,
  SystemConfig,
  User,
  UserProfileCompletionFields,
  UserProfileCompletionJson,
  UserProfileCompletionSchema,
};
