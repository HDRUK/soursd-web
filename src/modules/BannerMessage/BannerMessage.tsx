import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import Link from "next/link";

export default function BannerMessage() {
  return (
    <Message variant="filled" severity="warning">
      "BETA Preview: Please contact HDR UK if you'd like to help drive
      functionality during our initial preview phase: <ContactLink /> - Please
      be aware that some pages/features aren't fully available."
    </Message>
  );
}
