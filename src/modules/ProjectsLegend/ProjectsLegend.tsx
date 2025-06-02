import { useTranslations } from "next-intl";
import Legend from "../../components/Legend";
import {
  ApprovedIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "../../consts/icons";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function ProjectsLegend() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const items = [
    {
      text: t("approvedUserSDETREProject"),
      icon: <IdentityVerifiedIcon />,
    },
    {
      text: t("approvedProject"),
      icon: <ApprovedIcon />,
    },
    {
      text: t("approvedUserProject"),
      icon: <ApprovedUserIcon />,
    },
    {
      text: t("pendingProject"),
      icon: <PendingIcon />,
    },
  ];

  return <Legend items={items} />;
}
