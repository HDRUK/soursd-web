import { EntityType } from "@/types/api";
import { commonAccessibilityTests, render } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import Sections, { SectionsProps } from ".";

const mockedProps = {
  userId: faker.number.int(),
  type: EntityType.RESEARCHER,
};

const renderSections = (props?: Partial<SectionsProps>) =>
  render(<Sections {...mockedProps} {...props} />);

describe("<Sections />", () => {
  commonAccessibilityTests(renderSections());
});
