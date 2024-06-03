import { faker } from "@faker-js/faker";
import { ResearcherInviteResponse } from "./types";

function mockedIssuer(): ResearcherInviteResponse {
  return {
    name: faker.internet.userName(),
    invite_sent_at: "2024-05-13T00:00:00Z",
    contact_email: faker.internet.email(),
    enabled: 1,
    invite_accepted_at: "2024-05-13T00:00:00Z",
    organisation_id: parseInt(faker.string.numeric(), 10),
  };
}

export { mockedIssuer };
