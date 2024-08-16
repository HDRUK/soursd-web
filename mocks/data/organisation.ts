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
  idvt_completed_at: "",
  idvt_result_perc: 0,
  idvt_errors: "",
  organisation_name: faker.company.name(),
  organisation_unique_id: faker.string.uuid(),
  id: faker.number.int(),
  lead_applicant_email: faker.internet.email(),
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  registries: [
    {
      user: mockedUser({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@hdruk.ac.uk",
        id: 1,
      }),
    },
    {
      user: mockedUser({
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@hdruk.ac.uk",
        id: 2,
      }),
    },
  ],
  ...organisation,
});

export { mockedOrganisation };
