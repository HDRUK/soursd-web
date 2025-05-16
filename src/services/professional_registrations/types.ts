import { ResearcherProfessionalRegistration } from "../../types/application";

interface PostProfessionalRegistrationPayload {
  name: string;
  member_id: string;
}

type PutProfessionalRegistrationPayload = ResearcherProfessionalRegistration;

type PostProfessionalResgitrationResponse = ResearcherProfessionalRegistration;
type GetProfessionalRegistrationsResponse =
  ResearcherProfessionalRegistration[];

export type {
  PostProfessionalRegistrationPayload,
  PostProfessionalResgitrationResponse,
  GetProfessionalRegistrationsResponse,
  PutProfessionalRegistrationPayload,
};
