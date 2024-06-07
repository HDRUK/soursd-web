"use client";

import { useStore } from "@/data/store";
import { UpdateUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutation } from "react-query";
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
        const { firstName, lastName, email } = payload;
        const request = {
          ...userDetails,
          first_name: firstName,
          last_name: lastName,
          email,
        };

        await mutateUpdateAsync(request);

        setUser(request);
      }
    },
    [userDetails]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("title")}
      </Typography>
      {userDetails && (
        <PersonalDetails
          emailVerified={false}
          user={userDetails}
          mutateState={{
            isLoading: isUpdateLoading,
            isError: isUpdateError,
            error: `${(updateError as Error)?.message}`,
          }}
          onSubmit={handlePersonalDetailsSubmit}
        />
      )}
    </>
  );
}
