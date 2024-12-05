import { DataCustodianUser, Issuer } from "@/types/application";
import { faker } from "@faker-js/faker";

const mockedDataCustodian = (issuer?: Partial<Issuer>): Issuer => ({
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
  ...issuer,
});

const mockedDataCustodianUser = (
  issuerUser?: Partial<DataCustodianUser>
): DataCustodianUser => ({
  id: 1,
  issuer_id: 1,
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  role: "",
  ...issuerUser,
});

export { mockedDataCustodian, mockedDataCustodianUser };
