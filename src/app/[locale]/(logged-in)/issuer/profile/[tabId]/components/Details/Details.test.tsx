import { useStore } from "@/data/store";
import { mockedIssuer } from "@/mocks/data/issuer";
import { mockedUser } from "@/mocks/data/user";
import { act, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Details, { DetailsProps } from "./Details";

jest.mock("@/data/store");

const defaultIssuer = mockedIssuer();
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
});
