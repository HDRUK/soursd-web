import { ResearcherEmployment } from "@/types/application";

interface PostEmploymentsPayload {
  employer_name: string;
  from?: string | null;
  to?: string | null;
  is_current?: boolean;
  department: string;
  role: string;
  employer_address: string;
  ror: string;
  email: string;
}

type PostEmploymentsResponse = number;
type EmploymentsResponse = ResearcherEmployment[];

export type {
  EmploymentsResponse,
  PostEmploymentsPayload,
  PostEmploymentsResponse,
};
