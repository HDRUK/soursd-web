import { useStore } from "@/data/store";
import { useRouter } from "@/i18n/routing";
import { postRegister, PostRegisterPayload } from "@/services/auth";
import { PostOrganisationPayload } from "@/services/organisations";
import postOrganisationUnclaimed from "@/services/organisations/postOrganisationUnclaimed";
import { AccountType } from "@/types/accounts";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../useAuth";

interface UseRegisterUserArgs {
  selected: AccountType | null;
}

export default function useRegisterUser({ selected }: UseRegisterUserArgs) {
  const routes = useStore(store => store.application.routes);
  const router = useRouter();
  const auth = useAuth();

  const { mutateAsync, ...registerMutationState } = useMutation({
    mutationKey: ["registerError"],
    mutationFn: (payload: PostRegisterPayload) => {
      return postRegister(payload, {
        error: { message: "failedToRegister" },
      });
    },
  });

  const { mutateAsync: mutateAsyncOrganisation, ...organisationMutationState } =
    useMutation({
      mutationKey: ["postOrganisationUnclaimed"],
      mutationFn: (payload: PostOrganisationPayload) => {
        return postOrganisationUnclaimed(payload, {
          error: { message: "postOrganisationUnclaimedError" },
        });
      },
    });

  const handleRegister = async () => {
    if (!selected) return;

    let organisationId;

    if (selected === AccountType.ORGANISATION) {
      const { data } = await mutateAsyncOrganisation({
        organisation_name: "",
        lead_applicant_email: auth?.user?.email,
        unclaimed: 0,
      });

      organisationId = data;
    }

    await mutateAsync({
      account_type: selected,
      organisation_id: organisationId,
    }).then(() => {
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

  return {
    handleRegister,
    ...getCombinedQueryState([
      registerMutationState,
      organisationMutationState,
    ]),
  };
}
