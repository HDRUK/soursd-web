import { DetailedHTMLProps, HTMLAttributes } from "react";
import NavBar from "../NavBar";

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
