import { EntityType } from "@/types/api";
import { render } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import Sections, { SectionsProps } from ".";

const mockedProps = {
  userId: faker.number.int(),
  type: EntityType.RESEARCHER,
};

const renderSections = (props?: Partial<SectionsProps>) =>
  render(<Sections {...mockedProps} {...props} />);

describe("<Sections />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
