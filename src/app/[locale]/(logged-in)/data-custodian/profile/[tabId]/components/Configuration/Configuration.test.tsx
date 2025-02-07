import {
  getCustodianRules,
  patchCustodianRules,
  getRules,
} from "@/services/rules";
import { patchCustodian } from "@/services/custodians";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import Configuration from "./Configuration";

jest.mock("@/services/rules");
jest.mock("@/services/custodians");

jest.mock("@/data/store", () => ({
  useStore: jest.fn().mockImplementation(selector =>
    selector({
      getCustodian: () => ({ id: 1 }),
    })
  ),
}));

const mockRules = [
  { id: 1, title: "Rule 1", description: "Description 1" },
  { id: 2, title: "Rule 2", description: "Description 2" },
];

const mockCustodianRules = {
  data: [{ id: 1 }],
};

(getCustodianRules as jest.Mock).mockResolvedValue(mockCustodianRules);
(getRules as jest.Mock).mockResolvedValue({ data: mockRules });

const renderConfiguration = () => {
  return render(<Configuration />);
};

describe("<Configuration />", () => {
  it("renders all rules", async () => {
    renderConfiguration();

    await waitFor(() => {
      mockRules.forEach(rule => {
        expect(
          screen.getByText(`${rule.title} : ${rule.description}`)
        ).toBeInTheDocument();
      });
    });
  });

  it("checks the correct rules based on custodian rules", async () => {
    renderConfiguration();

    await waitFor(() => {
      const checkbox1 = screen.getByLabelText(
        `${mockRules[0].title} : ${mockRules[0].description}`
      );
      const checkbox2 = screen.getByLabelText(
        `${mockRules[1].title} : ${mockRules[1].description}`
      );

      expect(checkbox1).toBeChecked();
      expect(checkbox2).not.toBeChecked();
    });
  });

  it("submits form with correct data when rules and idvt are changed", async () => {
    renderConfiguration();

    await waitFor(() => {
      const rule = screen.getByLabelText(
        `${mockRules[1].title} : ${mockRules[1].description}`
      );
      fireEvent.click(rule);
    });

    const idvtToggle = screen.getByRole("checkbox", {
      name: /Do you require identification validation?/i,
    });
    fireEvent.click(idvtToggle);

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(patchCustodianRules).toHaveBeenCalledWith(
        1,
        { rule_ids: [1] },
        { error: { message: "submitError" } }
      );
      expect(patchCustodian).toHaveBeenCalledWith(
        1,
        {
          idvt_required: true,
        },
        { error: { message: "submitError" } }
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderConfiguration());
  });
});
