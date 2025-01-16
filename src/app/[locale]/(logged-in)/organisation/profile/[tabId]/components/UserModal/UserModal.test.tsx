import { mockedOrganisation } from "@/mocks/data/organisation";
import { postOrganisationsInviteUser } from "@/services/organisations";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import UserModal, { UserModalProps } from "./UserModal";

jest.mock("@/services/organisations");

const mockOnClose = jest.fn();

const defaultOrganisation = mockedOrganisation();

const mockedPayload = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
};

const renderUserModalDetails = (props?: Partial<UserModalProps>) => {
  return render(
    <UserModal
      organisation={defaultOrganisation}
      onClose={mockOnClose}
      open
      {...props}
    />
  );
};

const renderUserModalDetailsUpdate = () => {
  renderUserModalDetails();

  [
    { label: "First name", value: mockedPayload.first_name },
    { label: "Last name", value: mockedPayload.last_name },
    { label: "Email", value: mockedPayload.email },
  ].forEach(({ label, value }) => {
    const input = screen.getByLabelText(label);

    fireEvent.change(input, {
      target: { value },
    });
  });

  fireEvent.submit(screen.getByRole("button", { name: /Send invite/i }));
};

describe("<UserModal />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("is updated", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => {
      expect(postOrganisationsInviteUser).toHaveBeenCalled();
    });
  });

  it("show a success alert", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => screen.findByRole("button", { name: /OK/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderUserModalDetails());
  });
});
