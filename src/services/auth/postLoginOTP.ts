import { mockedRequest } from "@/utils/requests";
import { LoginOTPPayload } from "./types";

export default (payload: LoginOTPPayload) => {
  console.log("payload", payload);
  return mockedRequest(null);
};
