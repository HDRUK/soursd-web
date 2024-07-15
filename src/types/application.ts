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

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: keyof typeof UserGroup;
  permissions: Permission[];
  registry: {
    files: File[];
  };
}

interface Organisation {
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
  lead_applicant_organisation_email: string;
  registries: {
    user: User;
  }[];
}

interface ApplicationDataState {
  routes: Record<
    keyof typeof ROUTES,
    {
      key: string;
      path: string;
    }
  >;
  user?: User;
}

export type { ApplicationDataState, Organisation, User, Permission, File };
