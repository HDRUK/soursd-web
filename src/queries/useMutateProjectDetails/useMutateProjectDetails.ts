import {
  postProjectDetailsQuery,
  putProjectDetailsQuery,
} from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { MutationState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

interface UseCustodianInviteProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useMutateProjectDetails(
  id: number,
  callbacks?: UseCustodianInviteProps
) {
  const [data, setData] = useState(null);

  const { mutateAsync: mutatePostDetails, ...postQueryState } = useMutation(
    postProjectDetailsQuery()
  );

  const { mutateAsync: mutatePutDetails, ...putQueryState } = useMutation(
    putProjectDetailsQuery(id)
  );

  const mutateAsync = useCallback(async (projectDetails: ProjectDetails) => {
    try {
      let response;

      if (projectDetails?.id) {
        response = await mutatePutDetails(projectDetails);
      } else {
        response = await mutatePostDetails({
          ...projectDetails,
          project_id: id,
        });
      }

      setData(response.data);

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
        isSuccess: !!data,
      },
      mutateAsync,
    }),
    [queryState]
  );
}
