import { StoreUserHistories, useStore } from "@/data/store";
import { User } from "@/types/application";
import { binaryHas } from "@/utils/array";
import { useMemo } from "react";

export const IDENTITY_REQUIRED_FIELDS: Array<
  keyof User | ((user: User) => string | undefined)
> = ["first_name", "last_name"];

export const PROFESION_REGISTRATIONS_REQUIRED_SECTIONS: Array<
  keyof StoreUserHistories
> = ["training", "professionalRegistrations"];

export const EXPERIENCES_REQUIRED_SECTIONS: Array<keyof StoreUserHistories> = [
  "education",
  "employments",
  "accreditations",
];

export default function useUserProfile() {
  const { user, histories } = useStore(({ getHistories, getUser }) => {
    return {
      histories: getHistories(),
      user: getUser(),
    };
  });

  const percentageScore = (
    values: (string | number | boolean | undefined | null)[]
  ) => {
    return Math.ceil(
      (values.filter(value => {
        return (
          (typeof value === "string" && value.trim() !== "") ||
          typeof value === "number" ||
          typeof value === "boolean"
        );
      }).length /
        values.length) *
        100
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
    return histories
      ? percentageScore(
          EXPERIENCES_REQUIRED_SECTIONS.map(
            name => !!histories?.[name]?.length || undefined
          )
        )
      : 0;
  };

  const hasTraining = () => {
    return histories
      ? percentageScore(
          PROFESION_REGISTRATIONS_REQUIRED_SECTIONS.map(
            name => !!histories?.[name]?.length || undefined
          )
        )
      : 0;
  };

  const hasAffiliations = () => {
    return histories ? binaryHas(histories?.affiliations) * 100 : 0;
  };

  const trainingScore = hasTraining();
  const affiliationsScore = hasAffiliations();
  const experiencesScore = hasExperiences();
  const identityScore = hasIdentity();

  return useMemo(
    () => ({
      trainingScore,
      affiliationsScore,
      experiencesScore,
      identityScore,
      isComplete: [
        trainingScore,
        affiliationsScore,
        experiencesScore,
        identityScore,
      ].every(score => score === 100),
    }),
    [user, histories]
  );
}
