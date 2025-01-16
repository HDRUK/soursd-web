import { useApplicationData } from "@/context/ApplicationData";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import { AccountType } from "@/types/accounts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UseRegisterUserArgs {
  selected: AccountType | null;
}

export default function useRegisterUser({ selected }: UseRegisterUserArgs) {
  const { routes } = useApplicationData();
  const router = useRouter();

  const { mutateAsync, ...restMutationState } = useMutation({
    mutationKey: ["registerError"],
    mutationFn: (payload: PostRegisterPayload) => {
      return postRegister(payload, {
        error: { message: "failedToRegister" },
      });
    },
  });

  const handleRegister = async () => {
    if (!selected) return;

    mutateAsync({ account_type: selected }).then(() => {
      switch (selected) {
        case AccountType.ORGANISATION:
          router.replace(routes.profileOrganisation.path);
          break;
        case AccountType.USER:
          router.replace(routes.profileResearcher.path);
          break;
        default:
          router.replace(routes.homepage.path);
          break;
      }
    });
  };

  return { handleRegister, ...restMutationState };
}
