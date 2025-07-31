import { commonAccessibilityTests, render } from "../../utils/testUtils";
import ErrorMessage, { ErrorMessageProps } from "./ErrorMessage";

const mockTRich = {
  rich: jest.fn(),
};

const mockT = jest.fn();

const setupTest = (props?: Partial<ErrorMessageProps>) =>
  render(<ErrorMessage t={mockT} {...props} />);

describe("<ErrorMessage />", () => {
  it("shows the plain message", async () => {
    setupTest();

    expect(mockT).toHaveBeenCalledWith("error");
    expect(mockTRich.rich).not.toHaveBeenCalledWith();
  });

  it("shows the rich message", async () => {
    setupTest({
      t: mockTRich,
    });

    expect(mockTRich.rich).toHaveBeenCalledWith("error", {
      contactLink: expect.any(Function),
    });
    expect(mockT).not.toHaveBeenCalledWith();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
