import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { PropsWithChildren } from "react";

type ContactLinkProps = PropsWithChildren;

function ContactLink({ children }: ContactLinkProps) {
  return (
    <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>
      {children || CONTACT_MAIL_ADDRESS}
    </a>
  );
}

export default ContactLink;
