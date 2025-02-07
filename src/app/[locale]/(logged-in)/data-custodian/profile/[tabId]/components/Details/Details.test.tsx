import { useStore } from "@/data/store";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockedUser } from "@/mocks/data/user";
import { patchCustodian } from "@/services/custodians";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import Details, { DetailsProps } from "./Details";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const defaultCustodian = mockedCustodian();
const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

const renderDetails = (props?: Partial<DetailsProps>) => {
  return render(<Details custodian={defaultCustodian} {...props} />);
};

describe("<Details />", () => {
  it("has the correct values", async () => {
    renderDetails();

    const nameContainer = screen.getByTestId("name");
    const nameInput = within(nameContainer).getByRole("textbox");

    const emailContainer = screen.getByTestId("contact_email");
    const emailInput = within(emailContainer).getByRole("textbox");

    await waitFor(() => {
      expect(nameInput).toHaveValue(defaultCustodian.name);
      expect(emailInput).toHaveValue(defaultCustodian.contact_email);
    });
  });

  it("submits when values are defined", async () => {
    renderDetails();

    const emailContainer = screen.getByTestId("contact_email");
    const email = within(emailContainer).getByRole("textbox");

    const emailValue = faker.internet.email();

    if (email) {
      fireEvent.change(email, {
        target: { value: emailValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      await waitFor(() => {
        expect(patchCustodian).toHaveBeenCalledWith(
          defaultCustodian.id,
          {
            ...defaultCustodian,
            contact_email: emailValue,
          },
          { error: { message: "submitError" } }
        );
      });
    } else {
      fail("Contact email do not exist");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderDetails());
  });
});
