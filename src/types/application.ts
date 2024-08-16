import { FileStatus, FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";

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

interface Issuer {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  permissions: Permission[];
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
    issuer_id: number;
  };
};

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: UserGroup;
  permissions: Permission[];
  profile_completed_at: string | null;
  profile_steps_completed: string | null;
  approvals: Approval[];
  organisation_id: number | null;
  registry: {
    files: File[];
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
  lead_applicant_organisation_email: string;
  registries: {
    user: User;
  }[];
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
  systemConfigData: Record<string, any>;
  auth?: Auth;
}

type ApplicationSystemConfig = Record<string, any>;

export type {
  ApplicationDataState,
  ApplicationSystemConfig,
  Approval,
  Auth,
  Issuer,
  Organisation,
  OrganisationIdvt,
  User,
};
