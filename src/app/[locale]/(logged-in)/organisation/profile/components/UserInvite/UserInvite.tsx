import SendInviteUser from "@/modules/SendInviteUser";

interface UserInviteProps {
  organisationId?: number;
}

export default function UserInvite({ organisationId }: UserInviteProps) {
  <SendInviteUser organisationId={organisationId} />;
}
