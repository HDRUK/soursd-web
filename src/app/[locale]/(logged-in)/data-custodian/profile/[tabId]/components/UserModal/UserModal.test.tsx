import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  patchCustodianUser,
  postCustodianUser,
  postCustodianUserInvite,
} from "@/services/custodian_users";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
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

  commonAccessibilityTests(renderUserModalDetails());

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
