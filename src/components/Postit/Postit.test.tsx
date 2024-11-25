import { render, screen } from "@/utils/testUtils";
import Postit from "./Postit";

describe("<Postit />", () => {
  it("has the correct content", async () => {
    render(<Postit>Children</Postit>);

    const content = screen.getByText("Children");

    expect(content).toBeInTheDocument();
  });
});
