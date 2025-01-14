import Invite from "./components/Invite";

interface PageProps {
  params: {
    email: string;
    locale: string;
  };
}

export default function Page({ params }: PageProps) {
  return <Invite email={params.email} />;
}
