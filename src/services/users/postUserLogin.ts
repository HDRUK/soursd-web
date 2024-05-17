import { postRequest } from "../requests";
import { UsersLoginPayload } from "./types";

export default (values: UsersLoginPayload) => {
  return postRequest("/users", values);
};
