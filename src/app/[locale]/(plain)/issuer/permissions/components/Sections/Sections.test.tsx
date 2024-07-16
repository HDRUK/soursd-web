import { EntityType } from "@/types/api";
import { act, render } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import Sections, { SectionsProps } from ".";

const mockedProps = {
  userId: faker.number.int(),
  type: EntityType.researcher,
};

const renderSections = (props?: Partial<SectionsProps>) =>
  render(<Sections {...mockedProps} {...props} />);

describe("<Sections />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
