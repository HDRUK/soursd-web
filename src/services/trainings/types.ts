import { ResearcherTraining } from "@/types/application";

type TrainingsResponse = ResearcherTraining[];

interface PostTrainingsPayload {
  provider: string;
  awarded_at: string;
  expires_at: string;
  expires_in_years: number;
  training_name: string;
  certification_id: number | null;
}

type PostTrainingsResponse = number;

type PutTrainingsPayload = Partial<ResearcherTraining>;

type PutTrainingsResponse = ResearcherTraining;

export type {
  TrainingsResponse,
  PostTrainingsPayload,
  PostTrainingsResponse,
  PutTrainingsPayload,
  PutTrainingsResponse,
};
