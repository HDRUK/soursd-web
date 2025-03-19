import deleteAffiliation from "./deleteAffiliation";

export default function deleteAffiliationQuery() {
  return {
    mutationKey: ["deleteAffiliation"],
    mutationFn: (id: number) => {
      return deleteAffiliation(id, {
        error: { message: "deleteAffiliationError" },
      });
    },
  };
}
