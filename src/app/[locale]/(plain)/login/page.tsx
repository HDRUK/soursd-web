import { HTMLAttributes } from "react";
import DecoratorPanel from "../components/DecoratorPanel";
import LoginFormModal from "./components/LoginFormModal";

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
