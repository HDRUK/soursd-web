import { GetCustodianProjectUserResponse } from "@/services/custodians";
import { CustodianUser, Custodian, ProjectAllUser } from "@/types/application";
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

const mockedProjectUser = (props: Partial<ProjectAllUser>): ProjectAllUser => ({
  id: 1,
  first_name: "Dan",
  last_name: "Ackroyd",
  user_id: 10,
  digi_ident: "$2y$12$ldUAvE7ZsHkodDzZKJH4je9tNs/G9B7M0k.4ywN0em0v/KO5GQDTu",
  registry_id: 1,
  project_id: 1,
  project_name:
    "Exploring the Impact of Digital Health Interventions on Mental Health Outcomes in Young Adults",
  project_role: "Principal Investigator (PI)",
  organisation_id: 1,
  organisation_name: "Health Pathways (UK) Limited",
  model_state: {
    state: {
      slug: "registered",
    },
  },
  ...props,
});

export { mockedCustodian, mockedCustodianUser, mockedProjectUser };
