import { render, screen } from "@testing-library/react";
import LoadingWrapper from "./LoadingWrapper";

describe("LoadingWrapper", () => {
  it("renders loading state when 'loading' is true", () => {
    render(
      <LoadingWrapper loading>
        <div>Child Content</div>
      </LoadingWrapper>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();
  });

  it("renders children when 'loading' is false", () => {
    render(
      <LoadingWrapper loading={false}>
        <div>Child Content</div>
      </LoadingWrapper>
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
