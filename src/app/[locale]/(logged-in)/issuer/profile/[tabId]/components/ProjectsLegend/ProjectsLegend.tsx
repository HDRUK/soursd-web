import Legend from "@/components/Legend";
import {
  ApprovedIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "@/consts/icons";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function ProjectsLegend() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const items = [
    {
      text: t("approvedUserSDETREProject"),
      icon: <IdentityVerifiedIcon />,
    },
    {
      text: t("approvedUserProject"),
      icon: <ApprovedUserIcon />,
    },
    {
      text: t("approvedProject"),
      icon: <ApprovedIcon />,
    },
    {
      text: t("pendingProject"),
      icon: <PendingIcon />,
    },
  ];

  return <Legend items={items} />;
}
