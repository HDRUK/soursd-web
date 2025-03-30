import {
  postProjectDetailsQuery,
  putProjectDetailsQuery,
} from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

interface UseCustodianInviteProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useMutateProjectDetails(
  projectId: number,
  callbacks?: UseCustodianInviteProps
) {
  const [type, setType] = useState("");

  const { mutateAsync: mutatePostDetails, ...postQueryState } = useMutation(
    postProjectDetailsQuery()
  );

  const { mutateAsync: mutatePutDetails, ...putQueryState } = useMutation(
    putProjectDetailsQuery()
  );

  const mutateAsync = useCallback(async (projectDetails: ProjectDetails) => {
    try {
      if (projectDetails?.id) {
        await mutatePutDetails({
          params: {
            id: projectDetails?.id,
          },
          payload: projectDetails,
        });

        setType("PUT");
      } else {
        await mutatePostDetails({
          ...projectDetails,
          project_id: projectId,
        });

        setType("POST");
      }

      callbacks?.onSuccess?.();
    } catch (_) {
      callbacks?.onError?.();
    }
  }, []);

  const mutateState = type === "PUT" ? putQueryState : postQueryState;

  return useMemo(
    () => ({
      mutateState,
      mutateAsync,
    }),
    [mutateState]
  );
}
