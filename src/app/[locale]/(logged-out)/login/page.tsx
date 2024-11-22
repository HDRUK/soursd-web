import { HTMLAttributes } from "react";
import PageContainer from "@/modules/PageContainer";
import LoginFormModal from "./components/LoginFormModal";

type PageProps = HTMLAttributes<HTMLDivElement>;

export default function Page(props: PageProps) {
  return (
    <PageContainer>
      <div {...props}>
        <LoginFormModal />
      </div>
    </PageContainer>
  );
}
