import { UserProfileCompletionCategories } from "@/consts/user";
import { User, UserProfileCompletionSchema } from "@/types/application";

import { useStore } from "@/data/store";

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
      {
        name: "email",
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

  function update<T>(
    fields: T,
    category: UserProfileCompletionCategories,
    userData?: User
  ) {
    let currentState = user?.profile_steps_completed;

    schema[category].fields.forEach(({ name, required }) => {
      currentState = {
        ...currentState,
        [category]: {
          ...currentState[category],
          [name]:
            required &&
            !!(fields as Record<string, string | boolean | number>)[name],
        },
      };
    });

    if (user) {
      setUser({
        ...user,
        ...userData,
        profile_steps_completed: currentState,
      });
    }
  }

  return {
    update,
  };
}
