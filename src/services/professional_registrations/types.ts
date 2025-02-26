import { ResearcherProfessionalRegistration } from "@/types/application";

interface PostProfessionalRegistrationPayload {
  name: string;
  member_id: string;
}

type PostProfessionalResgitrationResponse = ResearcherProfessionalRegistration;
type GetProfessionalRegistrationsResponse =
  ResearcherProfessionalRegistration[];

export type {
  PostProfessionalRegistrationPayload,
  PostProfessionalResgitrationResponse,
  GetProfessionalRegistrationsResponse,
};
