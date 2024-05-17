import { UsersLoginResponse } from "./types";

function mockedUser(): UsersLoginResponse {
  return {
    name: "ONS",
    verificationExpiry: "2024-05-13T00:00:00Z",
  };
}

export { mockedUser };
