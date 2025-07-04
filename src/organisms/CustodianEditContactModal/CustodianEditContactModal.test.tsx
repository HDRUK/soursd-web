import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  putCustodianUser,
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
import CustodianEditContactModal, {
  CustodianEditContactModalProps,
} from "./CustodianEditContactModal";

jest.mock("@/services/custodian_users");
jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);
(postCustodianUser as unknown as jest.Mock).mockResolvedValue(
  mock200Json(1).json()
);

const mockOnClose = jest.fn();

const defaultUser = mockedCustodianUser();

const renderCustodianEditContactModalDetails = (
  props?: Partial<CustodianEditContactModalProps>
) => {
  return render(
    <CustodianEditContactModal
      user={defaultUser}
      custodianId={1}
      onClose={mockOnClose}
      open
      {...props}
    />
  );
};

const renderCustodianEditContactModalDetailsUpdate = (id?: number) => {
  renderCustodianEditContactModalDetails({
    user: {
      ...defaultUser,
      id,
    },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
};

describe("<CustodianEditContactModal />", () => {
  afterEach(() => {
    mockOnClose.mockReset();
  });

  it("update user is called with an id", async () => {
    renderCustodianEditContactModalDetailsUpdate(1);

    await waitFor(() => {
      expect(putCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).not.toHaveBeenCalled();
  });

  it("create user is called with no id", async () => {
    renderCustodianEditContactModalDetailsUpdate();

    await waitFor(() => {
      expect(postCustodianUser).toHaveBeenCalled();
    });

    expect(postCustodianUserInvite).toHaveBeenCalled();
  });

  it("show a success alert", async () => {
    renderCustodianEditContactModalDetailsUpdate();

    await waitFor(() => screen.findByRole("button", { name: /OK/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderCustodianEditContactModalDetails());
  });
});
