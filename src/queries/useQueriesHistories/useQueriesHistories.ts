import { getAccreditations } from "@/services/accreditations";
import { getEducations } from "@/services/educations";
import { getEmployments } from "@/services/employments";
import { getTrainings } from "@/services/trainings";
import useQueriesCombined from "@/hooks/useQueriesCombined";

export interface HistoryCombinedData {
  getEmployments: Awaited<ReturnType<typeof getEmployments>>;
  getEducations: Awaited<ReturnType<typeof getEducations>>;
  getTrainings: Awaited<ReturnType<typeof getTrainings>>;
  getAccreditations: Awaited<ReturnType<typeof getAccreditations>>;
}

export default function useQueriesHistory(
  registryId: number,
  enabled: boolean
) {
  const queries = [
    {
      queryKey: ["getEmployments", registryId],
      queryFn: () =>
        getEmployments(registryId, {
          error: { message: "getEmploymentsError" },
        }),
      enabled,
    },
    {
      queryKey: ["getEducations", registryId],
      queryFn: () =>
        getEducations(registryId, {
          error: { message: "getEducationsError" },
        }),
      enabled,
    },
    {
      queryKey: ["getTrainings", registryId],
      queryFn: () =>
        getTrainings(registryId, {
          error: { message: "getTrainingsError" },
        }),
      enabled,
    },
    {
      queryKey: ["getAccreditations", registryId],
      queryFn: () =>
        getAccreditations(registryId, {
          error: { message: "getAccreditationsError" },
        }),
      enabled,
    },
  ];

  return useQueriesCombined<HistoryCombinedData>(queries);
}
