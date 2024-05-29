import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";

export default function ContactLink() {
  return <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>;
}
