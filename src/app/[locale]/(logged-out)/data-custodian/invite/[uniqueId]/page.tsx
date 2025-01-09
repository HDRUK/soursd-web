import Invite from "./components/Invite";

interface PageProps {
  params: {
    uniqueId: string;
    locale: string;
  };
}

export default function Page({ params }: PageProps) {
  return <Invite uniqueId={params.uniqueId} />;
}
