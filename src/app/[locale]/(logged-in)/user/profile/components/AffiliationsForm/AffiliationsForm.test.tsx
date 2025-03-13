import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import AffiliationsForm from "./AffiliationsForm";

const mockSubmit = jest.fn();

const renderAffiliationsComponent = () => {
  const rendered = render(
    <AffiliationsForm
      onSubmit={mockSubmit}
      queryState={{
        isPending: false,
        isError: false,
        error: "",
      }}
    />
  );

  const button = screen.getByRole("button", { name: /add affiliation/i });

  act(() => {
    fireEvent.click(button);
  });

  return rendered;
};

describe("<AffiliationsForm />", () => {
  it.each(["organisation_id", "member_id", "relationship"])(
    "does not submit when %s is not defined",
    async fieldName => {
      const { container } = renderAffiliationsComponent();

      const input = container.querySelector(`input[name=${fieldName}]`);

      if (input) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });

        const button = screen.getByRole("button", { name: /add affiliation/i });

        await act(() => {
          fireEvent.submit(button);
        });

        expect(button).not.toBeDisabled();

        await waitFor(() => {
          expect(mockSubmit).not.toHaveBeenCalled();
        });
      } else {
        fail("Could not find input");
      }
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAffiliationsComponent());
  });
});
