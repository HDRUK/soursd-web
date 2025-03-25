import {
  postProjectDetailsQuery,
  putProjectDetailsQuery,
} from "@/services/project_details";
import { ProjectDetails, ResearcherProject } from "@/types/application";
import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface UseCustodianInviteProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useMutateProjectDetails(
  projectId: number,
  callbacks?: UseCustodianInviteProps
) {
  const { mutateAsync: mutatePostDetails, ...postQueryState } = useMutation(
    postProjectDetailsQuery()
  );

  const { mutateAsync: mutatePutDetails, ...putQueryState } = useMutation(
    putProjectDetailsQuery()
  );

  const mutateAsync = useCallback(async (projectDetails: ProjectDetails) => {
    try {
      let response;

      if (projectDetails?.id) {
        response = await mutatePutDetails({
          params: {
            id: projectDetails?.id,
          },
          payload: projectDetails,
        });
      } else {
        response = await mutatePostDetails({
          ...projectDetails,
          project_id: projectId,
        });
      }

      callbacks?.onSuccess?.();
    } catch (_) {
      callbacks?.onError?.();
    }
  }, []);

  const queryState = getCombinedQueryState<MutationState>([
    putQueryState,
    postQueryState,
  ]);

  return useMemo(
    () => ({
      queryState: {
        ...queryState,
        isSuccess: project?.project_detail?.id
          ? putQueryState.isSuccess
          : postQueryState.isSuccess,
      },
      mutateAsync,
    }),
    [queryState]
  );
}
