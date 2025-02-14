import getProfessionalRegistrations from "./getProfessionalRegistrations";

export default function getProfessionalRegistrationsQuery(registry_id: number) {
  return {
    queryKey: ["getProfessionalRegistrations", registry_id],
    queryFn: () =>
      getProfessionalRegistrations(registry_id, {
        error: {
          message: "getOrganisationsError",
        },
      }),
  };
}
