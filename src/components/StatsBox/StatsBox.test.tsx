import { render, screen } from "../../utils/testUtils";
import StatsBox from "./StatsBox";

describe("<Quote />", () => {
  it("has the correct content", async () => {
    render(
      <StatsBox
        description="Descripton content"
        icon="Icon"
        footer="Footer content"
      />
    );

    expect(screen.getByText("Descripton content")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});
