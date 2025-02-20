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
import Home, { HomeProps } from "./Home";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

const defaultCustodian = mockedCustodian();
const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

const renderHome = (props?: Partial<HomeProps>) => {
  return render(<Home custodian={defaultCustodian} {...props} />);
};

describe("<Home />", () => {
  it("has the correct values", async () => {
    renderHome();

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
    renderHome();

    const emailContainer = screen.getByTestId("contact_email");
    const email = within(emailContainer).getByRole("textbox");

    const idvtRequired = screen.getByRole("checkbox");

    const emailValue = faker.internet.email();

    if (email && idvtRequired) {
      fireEvent.change(email, {
        target: { value: emailValue },
      });

      fireEvent.click(idvtRequired);

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      await waitFor(() => {
        expect(patchCustodian).toHaveBeenCalledWith(
          defaultCustodian.id,
          {
            ...defaultCustodian,
            contact_email: emailValue,
            idvt_required: true,
          },
          { error: { message: "submitError" } }
        );
      });
    } else {
      fail("Contact email or idvt required do not exist");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderHome());
  });
});
