import NewReleasesIcon from "@mui/icons-material/NewReleases";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ReactNode } from "react";
import Text from "../Text";

interface PermissionsStatusProps {
  children: ReactNode;
  isApproved?: boolean;
}

export default function PermissionsStatus({
  isApproved,
  children,
}: PermissionsStatusProps) {
  return (
    <Text
      endIcon={
        isApproved ? (
          <VerifiedIcon color="success" titleAccess="Approved" />
        ) : (
          <NewReleasesIcon color="warning" titleAccess="Not approved" />
        )
      }>
      {children}
    </Text>
  );
}
