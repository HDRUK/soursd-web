import { Approval } from "@/types/application";
import { faker } from "@faker-js/faker";

const mockedApproval = (approval?: Partial<Approval>): Approval => ({
  id: 2,
  contact_email: faker.internet.email(),
  name: faker.company.buzzNoun(),
  invite_accepted_at: faker.date.past().toISOString(),
  invite_sent_at: faker.date.past().toISOString(),
  enabled: true,
  created_at: faker.date.past().toString(),
  updated_at: faker.date.recent().toString(),
  pivot: {
    organisation_id: faker.number.int(),
    issuer_id: faker.number.int(),
  },
  ...approval,
});

export { mockedApproval };
