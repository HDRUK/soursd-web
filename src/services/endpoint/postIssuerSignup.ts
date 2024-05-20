import { mockedRequest } from "@/utils/requests";
import { IssuerSignupPayload } from "./types";

export default (values: IssuerSignupPayload) => {
  console.log("values", values);
  return mockedRequest(null);
};
