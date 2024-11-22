import PageContainer from "@/modules/PageContainer";
import { HTMLAttributes } from "react";
import SignupFormModal from "./components/SignupFormModal";

type PageProps = HTMLAttributes<HTMLDivElement>;

export default function Page(props: PageProps) {
  return (
    <PageContainer>
      <div {...props}>
        <SignupFormModal />
      </div>
    </PageContainer>
  );
}
