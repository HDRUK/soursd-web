import { StoreUserHistories, useStore } from "@/data/store";
import { User } from "@/types/application";
import { binaryHas } from "@/utils/array";
import { useMemo } from "react";

export const IDENTITY_REQUIRED_FIELDS: Array<
  keyof User | ((user: User) => string | undefined)
> = ["first_name", "last_name"];

export const EXPERIENCES_REQUIRED_SECTIONS: Array<keyof StoreUserHistories> = [
  "education",
  "employments",
  "accreditations",
];

export default function useUserProfile() {
  const [user, histories] = useStore(state => [
    state.config.user,
    state.config.histories,
  ]);

  const percentageScore = (
    values: (string | number | boolean | undefined | null)[]
  ) => {
    return (
      Math.ceil(
        values.filter(value => {
          return (
            (typeof value === "string" && value.trim() !== "") ||
            typeof value === "number" ||
            typeof value === "boolean"
          );
        }).length / values.length
      ) * 100
    );
  };

  const hasIdentity = () => {
    return user
      ? percentageScore(
          IDENTITY_REQUIRED_FIELDS.map(name =>
            typeof name === "function" ? name(user) : user?.[name]
          )
        )
      : 0;
  };

  const hasExperiences = () => {
    console.log(
      "histories",
      EXPERIENCES_REQUIRED_SECTIONS.map(name => histories?.[name]?.length)
    );
    return histories
      ? percentageScore(
          EXPERIENCES_REQUIRED_SECTIONS.map(
            name => histories?.[name]?.length || undefined
          )
        )
      : 0;
  };

  const hasTrainings = () => {
    return histories ? binaryHas(histories?.training) * 100 : 0;
  };

  const hasAffiliations = () => {
    return histories ? binaryHas(histories?.affiliations) * 100 : 0;
  };

  const trainingsScore = hasTrainings();
  const affiliationsScore = hasAffiliations();
  const experiencesScore = hasExperiences();
  const identityScore = hasIdentity();

  return useMemo(
    () => ({
      trainingsScore,
      affiliationsScore,
      experiencesScore,
      identityScore,
      isComplete: [
        trainingsScore,
        affiliationsScore,
        experiencesScore,
        identityScore,
      ].every(score => score === 100),
    }),
    [user, histories]
  );
}
