import { useStore } from "@/data/store";
import { getOrganisationQuery } from "../../services/organisations";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useOrganisationStore() {
  const [organisation, setOrganisation] = useStore(state => [
    state.getOrganisation(),
    state.setOrganisation,
  ]);
  const { data: organisationData } = useQuery(
    getOrganisationQuery(organisation?.id as number)
  );

  useEffect(() => {
    if (organisationData?.data) setOrganisation(organisationData.data);
  }, [organisationData?.data]);

  return organisation;
}
