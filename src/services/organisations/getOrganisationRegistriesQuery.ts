import getOrganisationRegistries from "./getOrganisationRegistries";

export default function getOrganisationRegistriesQuery(organisationId: number) {
  return {
    queryKeyBase: ["getOrganisationRegistries", organisationId],
    queryFn: (queryParams: Record<string, string | number | undefined>) => {
      return getOrganisationRegistries(organisationId, queryParams, {
        error: {
          message: "getUsersError",
        },
      });
    },
  };
}
