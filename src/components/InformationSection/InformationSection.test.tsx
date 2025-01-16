import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import InformationSection, {
  InformationSectionProps,
} from "./InformationSection";

const renderInformationSection = (props?: Partial<InformationSectionProps>) => {
  return render(
    <InformationSection heading="Heading" description="Description" {...props}>
      Content
    </InformationSection>
  );
};

const renderOpenedContent = (props?: Partial<InformationSectionProps>) => {
  const component = renderInformationSection(props);

  const trigger = screen.getByRole("button");

  fireEvent.mouseOver(trigger);

  return component;
};

describe("<InformationSection />", () => {
  it("shows the popup content", async () => {
    renderOpenedContent();

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  it("has the correct roles", async () => {
    renderOpenedContent({ variant: "collapse" });

    const trigger = screen.getByRole("button");
    const info = screen.getByTestId("info");

    if (info && trigger) {
      expect(info).toBeControlledBy(trigger);
    }
  });

  it("shows the collapsed content", async () => {
    renderOpenedContent({ variant: "collapse" });

    await waitFor(() => {
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderInformationSection());
  });
});
