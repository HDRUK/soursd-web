import { getAccreditations } from "@/services/accreditations";
import { getEducations } from "@/services/educations";
import { getEmployments } from "@/services/employments";
import { getProjects } from "@/services/projects";
import { getTrainings } from "@/services/trainings";
import useQueriesCombined from "@/hooks/useQueriesCombined";

export interface HistoryCombinedData {
  getEmployments: Awaited<ReturnType<typeof getEmployments>>;
  getEducations: Awaited<ReturnType<typeof getEducations>>;
  getTrainings: Awaited<ReturnType<typeof getTrainings>>;
  getProjects: Awaited<ReturnType<typeof getProjects>>;
  getAccreditations: Awaited<ReturnType<typeof getAccreditations>>;
}

export default function useQueriesHistory(registryId: number) {
  const queries = [
    {
      queryKey: ["getEmployments", registryId],
      queryFn: () =>
        getEmployments(registryId, {
          error: { message: "getEmploymentsError" },
        }),
    },
    {
      queryKey: ["getEducations", registryId],
      queryFn: () =>
        getEducations(registryId, {
          error: { message: "getEducationsError" },
        }),
    },
    {
      queryKey: ["getTrainings", registryId],
      queryFn: () =>
        getTrainings(registryId, {
          error: { message: "getTrainingsError" },
        }),
    },
    {
      queryKey: ["getProjects", registryId],
      queryFn: () =>
        getProjects(registryId, {
          error: { message: "getProjectsError" },
        }),
    },
    {
      queryKey: ["getAccreditations", registryId],
      queryFn: () =>
        getAccreditations(registryId, {
          error: { message: "getAccreditationsError" },
        }),
    },
  ];

  return useQueriesCombined<HistoryCombinedData>(queries);
}
