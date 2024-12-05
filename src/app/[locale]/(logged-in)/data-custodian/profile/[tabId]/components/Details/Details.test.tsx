import { useStore } from "@/data/store";
import { mockedDataCustodian } from "@/mocks/data/issuer";
import { mockedUser } from "@/mocks/data/user";
import { patchIssuer } from "@/services/issuers";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import Details, { DetailsProps } from "./Details";

jest.mock("@/services/issuers");
jest.mock("@/data/store");

const defaultIssuer = mockedDataCustodian();
const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

const renderDetails = (props?: Partial<DetailsProps>) => {
  return render(<Details issuer={defaultIssuer} {...props} />);
};

describe("<Details />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderDetails();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("has the correct values", async () => {
    renderDetails();

    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Contact email");

    await waitFor(() => {
      expect(name).toHaveValue(defaultIssuer.name);
      expect(email).toHaveValue(defaultIssuer.contact_email);
    });
  });

  it("submits when values are defined", async () => {
    renderDetails();

    const email = screen.getByLabelText("Contact email");
    const idvtRequired = screen.getByRole("checkbox");

    const emailValue = faker.internet.email();

    if (email && idvtRequired) {
      fireEvent.change(email, {
        target: { value: emailValue },
      });

      fireEvent.click(idvtRequired);

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      await waitFor(() => {
        expect(patchIssuer).toHaveBeenCalledWith(
          defaultIssuer.id,
          {
            ...defaultIssuer,
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
});
