import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCustodianQuery } from "../../services/custodians";

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
