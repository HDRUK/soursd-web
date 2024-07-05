import { User } from "@/services/auth";

function getInitialsFromUser({ first_name, last_name }: User) {
  const fullName = `${first_name} ${last_name}`;

  return fullName.replace(/^(\w)[^\s]*[\s]*(\w)[\w]*/gi, "$1$2").toUpperCase();
}

export { getInitialsFromUser };
