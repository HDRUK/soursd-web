import useQueriesCombined from "@/hooks/useQueriesCombined";
import { getAccreditations } from "@/services/accreditations";
import getAffiliations from "@/services/affiliations/getAffiliations";
import getAffiliationsQuery from "@/services/affiliations/getAffiliationsQuery";
import { getEducations } from "@/services/educations";
import { getEmployments } from "@/services/employments";
import { getUserApprovedProjects } from "@/services/projects";
import { getTrainingByRegistryId } from "@/services/trainings";
import { QueryFunctionContext } from "@tanstack/react-query";

export interface HistoryCombinedData {
  getEmployments: Awaited<ReturnType<typeof getEmployments>>;
  getEducations: Awaited<ReturnType<typeof getEducations>>;
  getTrainings: Awaited<ReturnType<typeof getTrainingByRegistryId>>;
  getUserApprovedProjects: Awaited<ReturnType<typeof getUserApprovedProjects>>;
  getAccreditations: Awaited<ReturnType<typeof getAccreditations>>;
  getAffiliations: Awaited<ReturnType<typeof getAffiliations>>;
}

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

export default function useQueriesHistory(registryId: number) {
  const queries = registryId
    ? [
        getAffiliationsQuery(registryId),
        {
          queryKey: ["getEmployments", registryId],
          queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
            getEmployments(queryKey[1], {
              error: { message: "getEmploymentsError" },
            }),
          enabled: !!registryId,
        },
        {
          queryKey: ["getEducations", registryId],
          queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
            getEducations(queryKey[1], {
              error: { message: "getEducationsError" },
            }),
          enabled: !!registryId,
        },
        {
          queryKey: ["getTrainings", registryId],
          queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
            getTrainingByRegistryId(queryKey[1], {
              error: { message: "getTrainingsError" },
            }),
          enabled: !!registryId,
        },
        {
          queryKey: ["getAccreditations", registryId],
          queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
            getAccreditations(queryKey[1], {
              error: { message: "getAccreditationsError" },
            }),
          enabled: !!registryId,
        },
        {
          queryKey: ["getUserApprovedProjects", registryId],
          queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
            getUserApprovedProjects(queryKey[1], {
              error: { message: "getUserApprovedProjectsError" },
            }),
          enabled: !!registryId,
        },
      ]
    : [];

  return useQueriesCombined<HistoryCombinedData>(queries);
}
