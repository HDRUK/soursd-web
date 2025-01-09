import ApplicationLink from "@/components/ApplicationLink";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import { getCustodianByUniqueIdentifier } from "@/services/custodians";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

interface InviteProps {
  uniqueId: string;
}

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

export default function Invite({ uniqueId }: InviteProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const { routes } = useApplicationData();
  const router = useRouter();

  const {
    data: custodianData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCustodianByUniqueIdentifier", uniqueId],
    queryFn: ({ queryKey }) => {
      return getCustodianByUniqueIdentifier(queryKey[1], {
        error: {
          message: "getCustodianByUniqueIdentifierError",
        },
      });
    },
  });

  if (!isLoading) {
    if (isError) {
      notFound();
    } else if (custodianData?.data.invite_accepted_at) {
      return (
        <OverlayCenterAlert>
          {t.rich("inviteAccepted", {
            applicationLink: ApplicationLink,
          })}
        </OverlayCenterAlert>
      );
    }
  }

  // router.replace(keycloak reg path);
}
