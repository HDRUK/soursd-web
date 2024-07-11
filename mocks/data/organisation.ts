import { Organisation } from "@/services/organisations";
import { faker } from "@faker-js/faker";
import { mockedPermission } from "./permission";
import { mockedUser } from "./user";

const mockedOrganisation = (
  organisation?: Partial<Organisation>
): Organisation => ({
  organisation_name: faker.company.name(),
  organisation_unique_id: faker.string.uuid(),
  id: faker.number.int(),
  lead_applicant_email: faker.internet.email(),
  permissions: [mockedPermission()],
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
