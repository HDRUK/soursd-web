import { useStore } from "@/data/store";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { mockedUser } from "@/mocks/data/user";
import { useRouter } from "next/navigation";
import Sections from ".";

jest.mock("@/data/store");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockedPush = jest.fn();

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

const renderSections = () => render(<Sections />);

describe("<Sections />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    let results;

    await act(async () => {
      results = await axe(container);
    });
    expect(results).toHaveNoViolations();
  });
  it("display 10 projects", async () => {
    const { container } = renderSections();
    await waitFor(() => {
      expect(screen.queryByText("No projects found")).not.toBeInTheDocument();
      const accordions = container.querySelectorAll(".MuiAccordion-root");
      expect(accordions.length).toBe(10);
    });

    const accordions = container.querySelectorAll(".MuiAccordion-root");
    const secondAccordion = accordions[1];

    const expandIcon = secondAccordion.querySelector(
      ".MuiAccordionSummary-expandIconWrapper"
    );
    expect(expandIcon).toBeInTheDocument();
    fireEvent.click(expandIcon!);
  });
});
