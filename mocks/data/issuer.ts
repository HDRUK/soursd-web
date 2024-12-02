import { DataCustodian } from "@/types/application";
import { faker } from "@faker-js/faker";

const mockedDataCustodian = (
  dataCustodian?: Partial<DataCustodian>
): DataCustodian => ({
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
  ...dataCustodian,
});

export { mockedDataCustodian };
