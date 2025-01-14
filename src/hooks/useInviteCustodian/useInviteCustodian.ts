import { getCustodianUserByEmail } from "@/services/custodian_users";
import { getCustodianByEmail } from "@/services/custodians";
import { getCombinedQueryState } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";

interface UseRegisterCustodianProps {
  email: string;
  isUser?: boolean;
}

export default function useInviteCustodian(props: UseRegisterCustodianProps) {
  const { email, isUser } = props;

  const custodianUserQuery = useQuery({
    queryKey: ["getCustodianUserByEmail", email],
    queryFn: ({ queryKey }) => {
      return getCustodianUserByEmail(queryKey[1], {
        error: { message: "getCustodianUserByEmailError" },
      });
    },
    enabled: !!isUser && !!email,
  });

  const custodianQuery = useQuery({
    queryKey: ["getCustodianByEmail", email],
    queryFn: ({ queryKey }) => {
      return getCustodianByEmail(queryKey[1], {
        error: { message: "getCustodianByEmailError" },
      });
    },
    enabled: !isUser && !!email,
  });

  return {
    data: isUser ? custodianUserQuery.data : custodianQuery.data,
    ...getCombinedQueryState([custodianUserQuery, custodianQuery]),
  };
}
