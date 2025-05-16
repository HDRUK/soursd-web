import { useStore } from "@/data/store";
import { getCustodianQuery } from "../../services/custodians";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useCustodianStore() {
  const [custodian, setCustodian] = useStore(state => [
    state.getCustodian(),
    state.setCustodian,
  ]);
  const { data: custodianData } = useQuery(
    getCustodianQuery(custodian?.id as number)
  );

  useEffect(() => {
    if (custodianData?.data) setCustodian(custodianData.data);
  }, [custodianData?.data]);

  return custodian;
}
