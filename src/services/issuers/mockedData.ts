import { IssuerDetailsResponse } from "./types";

function mockedIssuer(): IssuerDetailsResponse {
  return {
    name: "ONS",
    verificationExpiry: "2024-05-13T00:00:00Z",
  };
}

export { mockedIssuer };
