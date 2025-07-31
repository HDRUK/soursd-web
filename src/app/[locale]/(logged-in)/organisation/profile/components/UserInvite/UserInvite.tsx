import InviteUser from "@/modules/InviteUser";

interface UserInviteProps {
  organisationId?: number;
}

export default function UserInvite({ organisationId }: UserInviteProps) {
  <InviteUser organisationId={organisationId} />;
}
