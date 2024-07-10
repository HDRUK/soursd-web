import { User } from "@/services/auth";
import { Organisation } from "@/services/organisations";

function getInitialsFromUser({ first_name, last_name }: User) {
  const fullName = `${first_name} ${last_name}`;

  return fullName.replace(/^(\w)[^\s]*[\s]*(\w)[\w]*/gi, "$1$2").toUpperCase();
}

function getInitialsFromOrganisation({ organisation_name }: Organisation) {
  return organisation_name.charAt(0).toUpperCase();
}

export { getInitialsFromUser, getInitialsFromOrganisation };
