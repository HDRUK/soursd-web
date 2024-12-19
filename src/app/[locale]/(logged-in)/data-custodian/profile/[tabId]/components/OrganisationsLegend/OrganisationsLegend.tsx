import Legend from "@/components/Legend";
import {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "@/consts/icons";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function OrganisationsLegend() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const items = [
    {
      text: t("identityVerifiedOrganisation"),
      icon: <IdentityVerifiedIcon />,
    },
    {
      text: t("approvedUserOrganisation"),
      icon: <ApprovedUserIcon />,
    },
    {
      text: t("approvedTrainingOrganisation"),
      icon: <ApprovedTrainingIcon />,
    },
    {
      text: t("approvedOrganisation"),
      icon: <ApprovedIcon />,
    },
    {
      text: t("pendingOrganisation"),
      icon: <PendingIcon />,
    },
  ];

  return (
    <Legend items={items} boxSx={{ justifyContent: "space-around", my: 2 }} />
  );
}
