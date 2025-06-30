import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import VeriffTermsAndConditions from "./VeriffTermsAndConditions";
import { mockedUser } from "@/mocks/data/user";

const mockUrl = faker.internet.url();

const mockMutateAsync = jest.fn().mockResolvedValue({
  url: mockUrl,
});
const mockCreateVeriffFrame = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation(() => ({
    mutateAsync: payload => mockMutateAsync(payload),
  })),
}));

jest.mock("@veriff/incontext-sdk", () => ({
  createVeriffFrame: data => mockCreateVeriffFrame(data),
  MESSAGES: {},
}));

const defaultProps = {
  onSuccess: jest.fn(),
  onClose: jest.fn(),
  open: true,
};

const user = mockedUser({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  id: faker.number.int(),
});

const setupTest = () => {
  return render(<VeriffTermsAndConditions {...defaultProps} />);
};

describe("<VeriffTermsAndConditions />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      config: {
        user,
      },
    });
  });

  it("renders modal with title and checkbox", () => {
    setupTest();

    expect(
      screen.getByText(/I consent to the above terms and conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("checkbox toggles correctly and has correct default state", () => {
    setupTest();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("calls onClose when Cancel button is clicked", () => {
    setupTest();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls query when Start is clicked", async () => {
    setupTest();

    const { id, first_name, last_name } = user;

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const startButton = screen.getByRole("button", {
      name: "Start Verification Check",
    });

    fireEvent.click(startButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        idNumber: id,
        firstName: user.first_name,
        lastName: user.last_name,
        vendorData: "dW5kZWZpbmVk",
      });
    });

    expect(mockCreateVeriffFrame).toHaveBeenCalledWith(
      expect.objectContaining({
        url: mockUrl,
      })
    );
  });
});
