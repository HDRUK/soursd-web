import { HTMLAttributes } from "react";
import LoginFormModal from "./components/LoginFormModal";
import DecoratorPanel from "../components/DecoratorPanel";

type PageProps = HTMLAttributes<HTMLDivElement>;

export default function Page(props: PageProps) {
  return (
    <DecoratorPanel>
      <div {...props}>
        <LoginFormModal />
      </div>
    </DecoratorPanel>
  );
}
