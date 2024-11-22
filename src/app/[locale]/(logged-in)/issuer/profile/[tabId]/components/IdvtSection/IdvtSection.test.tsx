import { act, render } from "@/utils/testUtils";
import { axe } from "jest-axe";
import IdvtSection, { IdvtSectionProps } from "./IdvtSection";

const mockOnChange = jest.fn();

const renderIdvtSection = (props?: Partial<IdvtSectionProps>) => {
  return render(
    <IdvtSection
      switchProps={{
        onChange: mockOnChange,
      }}
      {...props}
    />
  );
};

describe("<Details />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderIdvtSection();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
