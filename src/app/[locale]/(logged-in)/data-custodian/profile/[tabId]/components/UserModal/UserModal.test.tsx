import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  patchCustodianUser,
  postCustodianUserInvite,
  postCustodianUser,
} from "@/services/custodian_users";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { mock200Json } from "jest.utils";
import UserModal, { UserModalProps } from "./UserModal";

jest.mock("@/services/custodian_users");
jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);
(postCustodianUser as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);

const mockOnClose = jest.fn();

const defaultUser = mockedCustodianUser();

const renderUserModalDetails = (props?: Partial<UserModalProps>) => {
  return render(
    <UserModal
      user={defaultUser}
      custodianId={1}
      onClose={mockOnClose}
      open
      {...props}
    />
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
    mockOnClose.mockReset();
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
      expect(patchCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).not.toHaveBeenCalled();
  });

  it("create user is called with no id", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => {
      expect(postCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).toHaveBeenCalled();
  });

  it("show a success alert", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => screen.findByRole("button", { name: /OK/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
