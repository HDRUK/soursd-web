import { mockedOrganisation } from "@/mocks/data/organisation";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import NameAndAddress from "./NameAndAddress";

const patchProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("../../hooks/usePatchOrganisation", () => ({
  __esModule: true,
  default: () => patchProps,
}));

function setupTest() {
  return render(<NameAndAddress />);
}

function getAllInputs() {
  return [
    /Organisation name/,
    /Address 1/,
    /Address 2/,
    /Town/,
    /County/,
    /Country/,
    /Postcode/,
  ];
}

const organisation = mockedOrganisation();

describe("<NameAndAddress />", () => {
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

    const form = await screen.findByRole("form", { name: "Name and address" });
    fireEvent.submit(form);

    const {
      address_1,
      address_2,
      county,
      country,
      town,
      postcode,
      organisation_name,
    } = organisation;

    await waitFor(() => {
      expect(patchProps.onSubmit).toHaveBeenCalledWith({
        address_1,
        address_2,
        county,
        country,
        town,
        postcode,
        organisation_name,
      });
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", { name: "Name and address" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(patchProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
