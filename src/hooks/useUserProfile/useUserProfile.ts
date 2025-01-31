import { StoreUserHistories, useStore } from "@/data/store";
import { User } from "@/types/application";
import { binaryHas } from "@/utils/array";
import { useMemo } from "react";

const IDENTITY_REQUIRED_FIELDS: Array<
  keyof Pick<User, "first_name" | "last_name">
> = ["first_name", "last_name"];

const EXPERIENCES_REQUIRED_SECTIONS: Array<keyof StoreUserHistories> = [
  "education",
  "employments",
  "accreditations",
];

export default function useUserProfile() {
  const [user, histories] = useStore(state => [
    state.config.user,
    state.config.histories,
  ]);

  const percentageScore = (values: (string | number | undefined | null)[]) => {
    return (
      Math.ceil(
        values.filter(value => {
          return (
            (typeof value === "string" && value.trim() !== "") ||
            typeof value === "number"
          );
        }).length / values.length
      ) * 100
    );
  };

  const hasIdentity = () => {
    return percentageScore(IDENTITY_REQUIRED_FIELDS.map(name => user?.[name]));
  };

  const hasExperiences = () => {
    return percentageScore(
      EXPERIENCES_REQUIRED_SECTIONS.map(
        name => histories?.[name].length || undefined
      )
    );
  };

  const hasTrainings = () => {
    return binaryHas(histories?.training) * 100;
  };

  const hasAffiliations = () => {
    return binaryHas(histories?.affiliations) * 100;
  };

  return useMemo(
    () => ({
      trainingsScore: hasTrainings(),
      affiliationsScore: hasAffiliations(),
      experiencesScore: hasExperiences(),
      identityScore: hasIdentity(),
    }),
    [user, histories]
  );
}
