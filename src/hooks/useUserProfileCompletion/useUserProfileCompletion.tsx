import { UserProfileCompletionCategories } from "@/consts/user";
import { User, UserProfileCompletionSchema } from "@/types/application";

import { useStore } from "@/data/store";
import { PatchUserPayload } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import patchUser from "@/services/users/patchUser";
import dayjs from "dayjs";
import { useCallback } from "react";

const schema: UserProfileCompletionSchema = {
  [UserProfileCompletionCategories.IDENTITY]: {
    fields: [
      {
        name: "first_name",
        required: true,
      },
      {
        name: "last_name",
        required: true,
      },
      {
        name: "dob",
        required: true,
      },
    ],
  },
  [UserProfileCompletionCategories.AFFILIATIONS]: {
    fields: [],
  },
  [UserProfileCompletionCategories.EXPERIENCE]: {
    fields: [],
  },
  [UserProfileCompletionCategories.TRAINING]: {
    fields: [],
  },
};

export default function useProfileCompletion() {
  const [user, setUser] = useStore(store => [store.getUser(), store.setUser]);

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["patchUser"],
    mutationFn: (payload: PatchUserPayload) =>
      patchUser(user?.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const isCategoryCompleted = (category: UserProfileCompletionCategories) => {
    let currentState = JSON.parse(user?.profile_steps_completed || "{}");

    return !Object.keys(currentState[category] || {}).some((key: string) => {
      return !currentState[category][key];
    });
  };

  const update = useCallback(
    <T,>(
      formFields: T,
      category: UserProfileCompletionCategories,
      userData?: User
    ) => {
      let currentState = JSON.parse(user?.profile_steps_completed || "{}");
      let isCompleted = true;

      Object.keys(schema).forEach(
        (currentCategory: UserProfileCompletionCategories) => {
          const { fields } = schema[currentCategory];
          let score = 0;

          fields.forEach(({ name, required }, i) => {
            if (currentCategory === category) {
              const valueCompleted = !!(
                formFields as Record<string, string | boolean | number>
              )[name];

              if (required && valueCompleted) {
                score = Math.round(((i + 1) / fields.length) * 100);
              }

              currentState = {
                ...currentState,
                [category]: {
                  ...currentState[category],
                  score,
                  [name]: required && valueCompleted,
                },
              };

              if (!valueCompleted) isCompleted = false;
            } else {
              const valueCompleted =
                currentState[currentCategory][name] || !required;

              currentState = {
                ...currentState,
                [currentCategory]: {
                  ...currentState[currentCategory],
                  [name]: valueCompleted,
                },
              };

              if (!valueCompleted) isCompleted = false;
            }
          });
        }
      );

      if (user) {
        const updatedUser = {
          ...user,
          ...userData,
          profile_steps_completed: JSON.stringify(currentState),
          profile_completed_at: isCompleted ? dayjs().toISOString() : null,
        };

        mutate(updatedUser);
        setUser(updatedUser);
      }
    },
    [user]
  );

  const getJSON = (): UserProfileCompletionSchema => {
    return JSON.parse(user?.profile_steps_completed || "{}");
  };

  return {
    update,
    getJSON,
    isCategoryCompleted,
    isCompleted: !!user?.profile_completed_at,
    isError,
    isLoading: isPending,
    error,
  };
}
