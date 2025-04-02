import { render, screen } from "@/utils/testUtils";
import SoursdCard from "./SoursdCard";

describe("<SoursdCard />", () => {
  it("has the correct content", async () => {
    render(
      <SoursdCard
        name="Health Data"
        identifier="identifier"
        description="description">
        Children
      </SoursdCard>
    );

    expect(screen.getByText("HD")).toBeInTheDocument();
    expect(screen.getByText("identifier")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
  });
});
