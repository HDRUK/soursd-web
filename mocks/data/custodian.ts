import { CustodianUser, Custodian } from "@/types/application";
import { faker } from "@faker-js/faker";

const mockedCustodian = (custodian?: Partial<Custodian>): Custodian => ({
  id: 1,
  contact_email: faker.internet.email(),
  idvt_required: false,
  permissions: [],
  invite_accepted_at: null,
  invite_sent_at: null,
  unique_identifier: faker.string.uuid(),
  enabled: true,
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  name: faker.company.name(),
  ...custodian,
});

const mockedCustodianUser = (
  custodianUser?: Partial<CustodianUser>
): CustodianUser => ({
  id: 1,
  custodian_id: 1,
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  ...custodianUser,
  user_permissions: custodianUser?.user_permissions || [],
});

export { mockedCustodian, mockedCustodianUser };
