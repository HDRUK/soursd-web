import getOrganisations from "./getOrganisations";

export default function getOrganisationsQuery() {
  return {
    queryKey: ["getOrganisations"],
    queryFn: () =>
      getOrganisations({
        error: {
          message: "getOrganisationsError",
        },
      }),
  };
}
