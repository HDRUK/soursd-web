import Legend from "@/components/Legend";
import {
  ApprovedIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "@/consts/icons";

export default function OrganisationsLegend() {
  const items = [
    {
      text: "User approved to access SDE/TRE",
      icon: <IdentityVerifiedIcon />,
    },
    {
      text: "Approved User for this Project",
      icon: <ApprovedUserIcon />,
    },
    {
      text: "Approved Project",
      icon: <ApprovedIcon />,
    },
    {
      text: "Pending Project",
      icon: <PendingIcon />,
    },
  ];

  return <Legend items={items} />;
}
