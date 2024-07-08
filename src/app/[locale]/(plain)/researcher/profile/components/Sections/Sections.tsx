"use client";

import OverlayCenter from "@/components/OverlayCenter";
import { useStore } from "@/data/store";
import { User } from "@/services/auth";
import { UpdateUserPayload, getUser } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { ResponseJson } from "@/types/requests";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import PersonalDetails from "../PersonalDetails";
import { PersonalDetailsFormValues } from "../PersonalDetails/PersonalDetails";

const NAMESPACE_TRANSLATIONS_PROFILE = "PersonalDetails";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const [userDetails, setUser] = useStore(state => [
    state.config.user,
    state.setUser,
  ]);

  const {
    isError: isGetError,
    isLoading: isGetLoading,
    error: getError,
  } = useQuery(
    ["getUser", userDetails?.id],
    async ({ queryKey }) => {
      const [, id] = queryKey;

      return getUser(id, {
        error: {
          message: "submitError",
        },
      });
    },
    {
      onSuccess: ({ data }: ResponseJson<User>) => {
        setUser(data);
      },
      enabled: !!userDetails?.id,
    }
  );

  const {
    mutateAsync: mutateUpdateAsync,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useMutation(["postLogin"], async (payload: UpdateUserPayload) =>
    patchUser(userDetails?.id, payload, {
      error: {
        message: "submitError",
      },
    })
  );

  const handlePersonalDetailsSubmit = useCallback(
    async (payload: PersonalDetailsFormValues) => {
      if (userDetails?.id) {
        const { firstName, lastName } = payload;
        const request = {
          ...userDetails,
          first_name: firstName,
          last_name: lastName,
        };

        await mutateUpdateAsync(request);

        setUser(request);
      }
    },
    []
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("title")}
      </Typography>
      {!userDetails && isGetLoading && (
        <OverlayCenter>
          <CircularProgress />
        </OverlayCenter>
      )}
      {userDetails && (
        <PersonalDetails
          emailVerified={false}
          user={userDetails}
          mutateState={{
            isLoading: isUpdateLoading,
            isError: isUpdateError || isGetError,
            error: updateError || getError,
          }}
          onSubmit={handlePersonalDetailsSubmit}
        />
      )}
    </>
  );
}
