import { UserProfileCompletionCategories } from "@/consts/user";
import {
  User,
  UserProfileCompletionFields,
  UserProfileCompletionJson,
  UserProfileCompletionSchema,
} from "@/types/application";

import { useStore } from "@/data/store";
import { putUserQuery } from "@/services/users";
import { formatNowDBDate } from "@/utils/date";
import { showAlert } from "@/utils/showAlert";
import { useMutation } from "@tanstack/react-query";
import mergeWith from "lodash.mergewith";
import { useCallback, useEffect, useMemo } from "react";
import { current } from "immer";

const schema: UserProfileCompletionSchema = {
  [UserProfileCompletionCategories.IDENTITY]: [
    {
      name: "first_name",
      required: true,
    },
    {
      name: "last_name",
      required: true,
    },
    {
      name: "x",
      required: true,
    },
  ],
  [UserProfileCompletionCategories.AFFILIATIONS]: [],
  [UserProfileCompletionCategories.EXPERIENCE]: [],
  [UserProfileCompletionCategories.TRAINING]: [],
};

interface UseProfileCompletionProps {
  suppressMessage?: boolean;
}

export default function useProfileCompletion(
  options?: UseProfileCompletionProps
) {
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const { mutateAsync, isError, isPending, error } = useMutation(
    putUserQuery(user?.id)
  );

  const getCurrentState = () => {
    return JSON.parse(
      user?.profile_steps_completed || "{}"
    ) as UserProfileCompletionJson;
  };

  const getRequiredFieldsBySection = (
    section: UserProfileCompletionCategories
  ) => {
    return schema[section]
      .filter(({ required }) => required)
      .map(({ name }) => name);
  };

  const scoreBySection = async (
    section: UserProfileCompletionCategories,
    fields: Record<string, string | number>
  ) => {
    const requiredFields = getRequiredFieldsBySection(section);
    const filledFields = Object.keys(fields).filter(name => !!fields[name]);

    let scoreIndex = 0;

    requiredFields.forEach(requiredField => {
      if (filledFields.includes(requiredField)) {
        scoreIndex += 1;
      }
    });

    return Math.ceil((scoreIndex / requiredFields.length) * 100);
  };

  const createInitialSchemaEntry = () => {
    let currentState = getCurrentState();

    if (!!Object.keys(currentState).length) {
      Object.keys(schema).forEach(section => {
        currentState = {
          ...currentState,
          [section]: {
            score: 0,
          },
        };
      });
    }
  };

  // const isCategoryCompleted = (category: UserProfileCompletionCategories) => {
  //   const currentState = getCurrentState();

  //   return currentState[category]?.score === 100;
  // };

  // Prunes the fields of the user against the schema
  // const pruneFields = (
  //   completedStepsFields: UserProfileCompletionFields[],
  //   schemaFields: UserProfileCompletionFields[]
  // ) => {
  //   return completedStepsFields.filter(({ name: completedStepsFieldName }) =>
  //     schemaFields.find(
  //       ({ name: schemaFieldName }) =>
  //         completedStepsFieldName === schemaFieldName
  //     )
  //   );
  // };

  // Merges the base schema fields with those currently stored against the user
  // const mergeFields = (
  //   schemaFields: UserProfileCompletionFields[],
  //   completedStepsFields: UserProfileCompletionFields[]
  // ) => {
  //   return schemaFields.map(({ name: schemaFieldName, required }) => {
  //     const matchingField = completedStepsFields.find(
  //       ({ name: completedStepsFieldName }) =>
  //         completedStepsFieldName === schemaFieldName
  //     );

  //     const completedValue = user?.[schemaFieldName];

  //     if (matchingField) {
  //       return {
  //         ...matchingField,
  //         required,
  //         hasValue: !!completedValue,
  //       };
  //     }

  //     return {
  //       name: schemaFieldName,
  //       required,
  //       hasValue: !!completedValue,
  //     };
  //   });
  // };

  // Prunes and updates fields from schema
  // const updateFieldsFromSchema = () => {
  //   return mergeWith(
  //     {},
  //     schema,
  //     getCurrentState(),
  //     (schemaValue, completedStepsValue) => {
  //       if (Array.isArray(schemaValue)) {
  //         const prunedCompletedSteps = pruneFields(
  //           completedStepsValue,
  //           schemaValue
  //         );

  //         return mergeFields(schemaValue, prunedCompletedSteps);
  //       }

  //       return undefined;
  //     }
  //   );
  // };

  // Updates scores based on the number of required fields vs the number not field
  // const updateScores = (currentState: UserProfileCompletionJson) => {
  //   let isCompleted = true;

  //   console.log("currentState", currentState);

  //   Object.keys(currentState).forEach(
  //     (currentCategory: UserProfileCompletionCategories) => {
  //       const fields = currentState[currentCategory]?.fields || [];
  //       console.log("FIELDS", fields);
  //       const isRequired = [];
  //       const isValue = [];

  //       fields.forEach(({ hasValue, required, name }) => {
  //         if (required) {
  //           isRequired.push(name);

  //           if (hasValue) {
  //             isValue.push(name);
  //           }
  //         }
  //       });

  //       console.log("isRequired", isRequired, isValue);

  //       const score = !isRequired.length
  //         ? 100
  //         : Math.round((isValue.length / isRequired.length) * 100);

  //       currentState[currentCategory].score = score;

  //       if (score < 100) isCompleted = false;
  //     }
  //   );

  //   return {
  //     updatedState: currentState,
  //     isCompleted,
  //   };
  // };

  // Performs api and state updates
  // const updateToApi = async (
  //   user: User,
  //   isCompleted: boolean,
  //   updatedState: UserProfileCompletionJson
  // ) => {
  //   const payload = {
  //     profile_steps_completed: JSON.stringify(updatedState),
  //     profile_completed_at: isCompleted ? formatNowDBDate() : null,
  //   };

  //   setUser({
  //     ...user,
  //     ...payload,
  //   });
  //   return await mutateAsync(payload);
  // };

  // const updateInitialSchema = async () => {
  //   console.log("updateFieldsFromSchema()", updateFieldsFromSchema());
  //   const { updatedState, isCompleted } = updateScores(
  //     updateFieldsFromSchema()
  //   );

  //   console.log("{ updatedState, isCompleted }", { updatedState, isCompleted });

  //   return await updateToApi(user, isCompleted, updatedState);
  // };

  // const getJSON = (): UserProfileCompletionSchema => {
  //   return JSON.parse(user?.profile_steps_completed || "{}");
  // };

  // const update = useCallback(
  //   async (
  //     formFields: { [key: string]: string | number | boolean },
  //     category: UserProfileCompletionCategories
  //   ) => {
  //     const currentState = getJSON();

  //     currentState[category].fields = currentState[category].fields.map(
  //       field => {
  //         const { name } = field;
  //         const value = formFields[name];

  //         return {
  //           ...field,
  //           hasValue: !(value === undefined || value === null || value === ""),
  //         };
  //       }
  //     );

  //     const { isCompleted, updatedState } = updateScores(currentState);

  //     return await updateToApi(user, isCompleted, updatedState);
  //   },
  //   [user]
  // );

  // Updates the schema when the page first loads
  useEffect(() => {
    const init = async () => {
      const { data } = await updateInitialSchema();

      console.log("data", data);

      if (!data.profile_completed_at && !options?.suppressMessage) {
        showAlert("warning", {
          text: "profileCompleteWarningMessage",
        });
      }
    };

    init();
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
