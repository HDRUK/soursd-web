import { ResearcherTraining } from "@/types/application";

type TrainingsResponse = ResearcherTraining[];

interface PostTrainingsPayload {
  provider: string;
  awarded_at: string;
  expires_at: string;
  expires_in_years: number;
  training_name: string;
  certification_uploaded: boolean;
}

type PostTrainingsResponse = number;

export type { TrainingsResponse, PostTrainingsPayload, PostTrainingsResponse };
