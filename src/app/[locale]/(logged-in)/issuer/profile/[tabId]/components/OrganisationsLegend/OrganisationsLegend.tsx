import Legend from "@/components/Legend";
import {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "@/consts/icons";

export default function OrganisationsLegend() {
  const items = [
    {
      text: "Identity Verified",
      icon: <IdentityVerifiedIcon />,
    },
    {
      text: "Approved User",
      icon: <ApprovedUserIcon />,
    },
    {
      text: "Approved Training",
      icon: <ApprovedTrainingIcon />,
    },
    {
      text: "Approved Organisation",
      icon: <ApprovedIcon />,
    },
    {
      text: "Pending Organisation",
      icon: <PendingIcon />,
    },
  ];

  return <Legend items={items} />;
}
