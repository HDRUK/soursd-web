import DecoratorPanel from "@/modules/DecoratorPanel";
import { HTMLAttributes } from "react";
import SignupFormModal from "../components/SignupFormModal";

type PageProps = HTMLAttributes<HTMLDivElement>;

export default function Page(props: PageProps) {
  return (
    <DecoratorPanel>
      <div {...props}>
        <SignupFormModal />
      </div>
    </DecoratorPanel>
  );
}
