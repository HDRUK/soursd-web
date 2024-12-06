import { render, screen } from "@testing-library/react";
import LoadingWrapper, { LoadingWrapperProps } from "./LoadingWrapper";

const renderLoadingWrapper = (props?: Partial<LoadingWrapperProps>) =>
  render(
    <LoadingWrapper loading {...props}>
      <div>Child Content</div>
    </LoadingWrapper>
  );

describe("LoadingWrapper", () => {
  it("renders loading state when 'loading' is true", () => {
    renderLoadingWrapper();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();
  });

  it("renders children when 'loading' is false", () => {
    renderLoadingWrapper({
      loading: false,
    });

    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("renders a basic loading state", () => {
    renderLoadingWrapper({
      variant: "basic",
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();
  });
});
