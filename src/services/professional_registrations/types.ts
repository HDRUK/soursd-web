import { ResearcherProfessionalRegistration } from "@/types/application";

interface PostProfessionalRegistrationPayload {
  name: string;
  registration_id: string;
}

type PostProfessionalResgitrationResponse = number;
type GetProfessionalRegistrationsResponse =
  ResearcherProfessionalRegistration[];

export type {
  PostProfessionalRegistrationPayload,
  PostProfessionalResgitrationResponse,
  GetProfessionalRegistrationsResponse,
};
