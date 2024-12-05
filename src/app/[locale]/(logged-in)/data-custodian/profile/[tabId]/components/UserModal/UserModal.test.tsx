import { mockedDataCustodianUser } from "@/mocks/data/issuer";
import { patchIssuerUser, postIssuerUser } from "@/services/issuer_users";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import UserModal, { UserModalProps } from "./UserModal";

jest.mock("@/services/issuer_users");

const mockOnClose = jest.fn();

const defaultUser = mockedDataCustodianUser();

const renderUserModalDetails = (props?: Partial<UserModalProps>) => {
  return render(
    <UserModal user={defaultUser} onClose={mockOnClose} open {...props} />
  );
};

const renderUserModalDetailsUpdate = (id?: number) => {
  renderUserModalDetails({
    user: {
      ...defaultUser,
      id,
    },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
};

describe("<UserModal />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("has no accessibility validations", async () => {
    const { container } = renderUserModalDetails();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("update user is called with an id", async () => {
    renderUserModalDetailsUpdate(1);

    await waitFor(() => {
      expect(patchIssuerUser).toHaveBeenCalled();
    });
  });

  it("create user is called with no id", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => {
      expect(postIssuerUser).toHaveBeenCalled();
    });
  });

  it("show a success alert", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => screen.findByRole("button", { name: /OK/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
