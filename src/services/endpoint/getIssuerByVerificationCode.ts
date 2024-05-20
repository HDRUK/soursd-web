import { mockedRequest } from "@/utils/requests";
import { mockedIssuer } from "./getIssuerByVerificationCode.mock";

export default (verificationCode: string) => {
  console.log("verificationCode", verificationCode);
  return mockedRequest(mockedIssuer());
};
