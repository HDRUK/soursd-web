import { mockedRequest } from "@/utils/requests";
import { mockedIssuer } from "./mockedData";

export default (verificationCode: string) => {
  console.log("verificationCode", verificationCode);
  return mockedRequest(mockedIssuer());
};
