import { patchCustodianRulesQuery } from "@/services/rules";
import { patchCustodianQuery } from "@/services/custodians";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Configuration from "./Configuration";

jest.mock("@/services/rules", () => ({
  getCustodianRulesQuery: jest.fn().mockReturnValue({
    queryKey: ["getCustodianRules", 1],
    queryFn: jest.fn().mockResolvedValue({ data: [{ id: 1 }] }),
  }),
  getRulesQuery: jest.fn().mockReturnValue({
    queryKey: ["getAllRules"],
    queryFn: jest.fn().mockResolvedValue({
      data: [
        { id: 1, title: "Rule 1", description: "Description 1" },
        { id: 2, title: "Rule 2", description: "Description 2" },
      ],
    }),
  }),
  patchCustodianRulesQuery: jest.fn().mockReturnValue({
    mutationFn: jest.fn().mockResolvedValue({ data: { id: 1 } }),
  }),
}));

jest.mock("@/services/custodians", () => ({
  patchCustodianQuery: jest.fn().mockReturnValue({
    mutationFn: jest.fn().mockResolvedValue({ data: { id: 1 } }),
  }),
}));
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

queryClient.setQueryData(["getCustodianRules", 1], { data: [{ id: 1 }] });
queryClient.setQueryData(["getAllRules"], { data: mockRules });

const renderConfiguration = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Configuration />
    </QueryClientProvider>
  );
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

    const idvtToggle = screen.getAllByRole("checkbox")[2];
    fireEvent.click(idvtToggle);

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(patchCustodianRulesQuery).toHaveBeenCalled();
      expect(patchCustodianQuery).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderConfiguration());
  });
});
