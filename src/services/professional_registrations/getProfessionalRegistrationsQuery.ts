import getProfessionalRegistrations from "./getProfessionalRegistrations";

export default function getProfessionalRegistrationsQuery(registry_id: number) {
  return {
    queryKey: ["getProfessionalRegistration"],
    queryFn: () =>
      getProfessionalRegistrations(registry_id, {
        error: {
          message: "getOrganisationsError",
        },
      }),
  };
}
