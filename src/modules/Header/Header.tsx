import NavBar from "@/organisms/NavBar";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadElement>,
  HTMLHeadElement
>;

export default function Header(props: HeaderProps) {
  return (
    <header {...props}>
      <NavBar />
    </header>
  );
}
