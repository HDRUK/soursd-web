import { UserProfileCompletionCategories } from "@/consts/user";
import {
  User,
  UserProfileCompletionFields,
  UserProfileCompletionJson,
  UserProfileCompletionSchema,
} from "@/types/application";

import { useStore } from "@/data/store";
import { PatchUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { formatNowDBDate } from "@/utils/date";
import { useMutation } from "@tanstack/react-query";
import mergeWith from "lodash.mergewith";
import { useCallback, useEffect, useMemo } from "react";

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
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const { mutateAsync, isError, isPending, error } = useMutation({
    mutationKey: ["patchUser"],
    mutationFn: (payload: PatchUserPayload) =>
      patchUser(1, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const getCurrentState = () => {
    return JSON.parse(
      user?.profile_steps_completed || "{}"
    ) as UserProfileCompletionJson;
  };

  const isCategoryCompleted = (category: UserProfileCompletionCategories) => {
    const currentState = getCurrentState();

    return currentState[category]?.score === 100;
  };

  // Prunes the fields of the user against the schema
  const pruneFields = (
    completedStepsFields: UserProfileCompletionFields[],
    schemaFields: UserProfileCompletionFields[]
  ) => {
    return completedStepsFields.filter(({ name: completedStepsFieldName }) =>
      schemaFields.find(
        ({ name: schemaFieldName }) =>
          completedStepsFieldName === schemaFieldName
      )
    );
  };

  // Merges the base schema fields with those currently stored against the user
  const mergeFields = (
    schemaFields: UserProfileCompletionFields[],
    completedStepsFields: UserProfileCompletionFields[]
  ) => {
    return schemaFields.map(({ name: schemaFieldName, required }) => {
      const matchingField = completedStepsFields.find(
        ({ name: completedStepsFieldName }) =>
          completedStepsFieldName === schemaFieldName
      );

      const completedValue = user?.[schemaFieldName];

      if (matchingField) {
        return {
          ...matchingField,
          required,
          hasValue: !!completedValue,
        };
      }

      return {
        name: schemaFieldName,
        required,
        hasValue: !!completedValue,
      };
    });
  };

  // Prunes and updates fields from schema
  const updateFieldsFromSchema = () => {
    return mergeWith(
      {},
      schema,
      getCurrentState(),
      (schemaValue, completedStepsValue) => {
        if (Array.isArray(schemaValue)) {
          const prunedCompletedSteps = pruneFields(
            completedStepsValue,
            schemaValue
          );

          return mergeFields(schemaValue, prunedCompletedSteps);
        }

        return undefined;
      }
    );
  };

  // Updates scores based on the number of required fields vs the number not field
  const updateScores = (currentState: UserProfileCompletionJson) => {
    let isCompleted = true;

    Object.keys(currentState).forEach(
      (currentCategory: UserProfileCompletionCategories) => {
        const fields = currentState[currentCategory]?.fields || [];
        const isRequired = [];
        const isValue = [];

        fields.forEach(({ hasValue, required, name }) => {
          if (required) {
            isRequired.push(name);

            if (hasValue) {
              isValue.push(name);
            }
          }
        });

        const score = !isRequired.length
          ? 100
          : Math.round((isValue.length / isRequired.length) * 100);

        currentState[currentCategory].score = score;

        if (score < 100) isCompleted = false;
      }
    );

    return {
      updatedState: currentState,
      isCompleted,
    };
  };

  // Performs api and state updates
  const updateToApi = async (
    user: User,
    isCompleted: boolean,
    updatedState: UserProfileCompletionJson
  ) => {
    const updatedUser = {
      ...user,
      profile_steps_completed: JSON.stringify(updatedState),
      profile_completed_at: isCompleted ? formatNowDBDate() : null,
    };

    setUser(updatedUser);
    await mutateAsync(updatedUser);
  };

  const updateInitialSchema = async () => {
    const { updatedState, isCompleted } = updateScores(
      updateFieldsFromSchema()
    );

    updateToApi(user, isCompleted, updatedState);
  };

  const getJSON = (): UserProfileCompletionSchema => {
    return JSON.parse(user?.profile_steps_completed || "{}");
  };

  const update = useCallback(
    async (
      formFields: { [key: string]: string | number | boolean },
      category: UserProfileCompletionCategories
    ) => {
      const currentState = getJSON();

      currentState[category].fields = currentState[category].fields.map(
        field => {
          const { name } = field;
          const value = formFields[name];

          return {
            ...field,
            hasValue: !(value === undefined || value === null || value === ""),
          };
        }
      );

      const { isCompleted, updatedState } = updateScores(currentState);

      updateToApi(user, isCompleted, updatedState);
    },
    [user]
  );

  // Updates the schema when the page first loads
  useEffect(() => {
    updateInitialSchema();
  }, []);

  return useMemo(
    () => ({
      update,
      getJSON,
      isCategoryCompleted,
      isCompleted: !!user?.profile_completed_at,
      isError,
      isLoading: isPending,
      error,
    }),
    [user, isError, isPending, error]
  );
}
