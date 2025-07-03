import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCustodianQuery } from "../../services/custodians";

export default function useCustodianStore() {
  const getCustodian = useStore(state => state.getCustodian);
  const setCustodian = useStore(state => state.setCustodian);

  const custodian = getCustodian();

  const { data: custodianData } = useQuery(
    getCustodianQuery(custodian?.id as number)
  );

  useEffect(() => {
    if (custodianData?.data) {
      setCustodian(custodianData.data);
    }
  }, [custodianData?.data, setCustodian]);

  return custodian;
}
