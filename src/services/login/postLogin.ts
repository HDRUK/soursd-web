import { mockedRequest } from "@/utils/requests";
import { LoginPayload } from "./types";

export default (payload: LoginPayload) => {
  console.log("payload", payload);
  return mockedRequest(null);
};
