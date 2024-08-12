import { Organisation } from "@/services/organisations";
import { faker } from "@faker-js/faker";
import { mockedPermission } from "./permission";
import { mockedUser } from "./user";
import { mockedApproval } from "./approvals";

const mockedOrganisation = (
  organisation?: Partial<Organisation>
): Organisation => ({
  address_1: faker.string.sample(),
  address_2: faker.string.sample(),
  town: faker.string.sample(),
  county: faker.string.sample(),
  country: faker.string.sample(),
  postcode: faker.string.sample(),
  companies_house_no: faker.string.alphanumeric(8),
  dpo_email: "",
  dpo_name: "",
  hr_email: "",
  hr_name: "",
  idvt_result: null,
  organisation_name: faker.company.name(),
  organisation_unique_id: faker.string.uuid(),
  id: faker.number.int(),
  lead_applicant_organisation_email: faker.internet.email(),
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  registries: [
    {
      user: mockedUser({ email: "john.smith@hdruk.ac.uk", id: 1 }),
    },
    {
      user: mockedUser({ email: "jane.doe@hdruk.ac.uk", id: 2 }),
    },
  ],
  ...organisation,
});

export { mockedOrganisation };
