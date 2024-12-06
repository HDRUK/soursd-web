import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { ReactNode } from "react";
import { ConfigProps, withConfig } from "../Config";

interface ApplicationLinkProps extends ConfigProps {
  variant?: "profile" | "contact";
  children?: ReactNode;
}

function ApplicationLink({
  variant = "contact",
  config,
  children,
}: ApplicationLinkProps) {
  const { routes } = config;

  if (variant === "profile") {
    return <a href={routes.profileResearcherDetails.path}>{children}</a>;
  }

  return <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>;
}

export default withConfig(ApplicationLink);
