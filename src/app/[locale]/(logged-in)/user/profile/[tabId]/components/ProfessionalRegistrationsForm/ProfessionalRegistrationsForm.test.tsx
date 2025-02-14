import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import ProfessionalRegistrationsForm from "./ProfessionalRegistrationsForm";

const mockSubmit = jest.fn();

const renderProfessionalRegistrationsForm = () => {
  return render(
    <ProfessionalRegistrationsForm
      onSubmit={mockSubmit}
      queryState={{
        isPending: false,
        isError: false,
        error: "",
      }}
    />
  );
};

describe("<ProfessionalRegistrationsForm />", () => {
  it.each(["name", "member_id"])(
    "does not submit when %s is not defined",
    async fieldName => {
      const { container } = renderProfessionalRegistrationsForm();

      const input = container.querySelector(`input[name=${fieldName}]`);

      if (input) {
        fireEvent.change(input, { target: { value: faker.string.sample() } });

        const button = screen.getByRole("button", { name: /save/i });

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
    commonAccessibilityTests(renderProfessionalRegistrationsForm());
  });
});
