import { mockedCharity, mockedOrganisation } from "@/mocks/data/organisation";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import DigitalIdentifiers from "./DigitalIdentifiers";

const putProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("../../hooks/useUpdateOrganisation", () => ({
  __esModule: true,
  default: () => putProps,
}));

function setupTest() {
  return render(<DigitalIdentifiers />);
}

function getAllInputs() {
  return [/Companies House ID/, /ROR ID/];
}

const organisation = mockedOrganisation({
  charities: [mockedCharity()],
});

describe("<DigitalIdentifiers />", () => {
  beforeEach(() => {
    mockUseStore({
      config: { organisation },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", {
      name: "Digital identifiers",
    });
    fireEvent.submit(form);

    const { charities, companies_house_no, ror_id } = organisation;

    await waitFor(() => {
      expect(putProps.onSubmit).toHaveBeenCalledWith({
        charities,
        companies_house_no,
        ror_id,
      });
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", {
      name: "Digital identifiers",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(putProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
