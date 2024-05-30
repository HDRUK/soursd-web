import { faker } from "@faker-js/faker";
import { IssuerInviteResponse } from "./types";

function mockedIssuer(): IssuerInviteResponse {
  return {
    name: faker.internet.userName(),
    invite_sent_at: "2024-05-13T00:00:00Z",
    contact_email: faker.internet.email(),
    enabled: 1,
    invite_accepted_at: "2024-05-13T00:00:00Z",
  };
}

export { mockedIssuer };
