import { mockedPermission } from "@/mocks/data/permission";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "../../utils/testUtils";
import AssignOptions, { AssignOptionsProps } from "./AssignOptions";

const mockSubmit = jest.fn();

const mockProps = {
  parentData: [
    mockedPermission({ id: 1, name: "ACCESS_GATEWAY" }),
    mockedPermission({ id: 2, name: "ACCESS_GATEWAY_DISCOVERY" }),
    mockedPermission({ id: 3, name: "ACCESS_WEBSITE" }),
  ],
  subsetData: [mockedPermission({ id: 2 })],
  queryState: {
    isLoading: false,
    isError: false,
    error: "",
  },
};

const renderAssignOptions = (props?: Partial<AssignOptionsProps>) =>
  render(<AssignOptions onSubmit={mockSubmit} {...mockProps} {...props} />);

describe("<AssignOptions />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("show a loader", async () => {
    renderAssignOptions({
      queryState: {
        isLoading: true,
        isError: false,
        error: "",
      },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows an error", async () => {
    renderAssignOptions({
      queryState: {
        isLoading: false,
        isError: true,
        error: "There has been an error",
      },
    });

    expect(screen.getByText("There has been an error")).toBeInTheDocument();
  });

  it("submits with the correct values", async () => {
    renderAssignOptions();

    await act(() => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(mockSubmit.mock.calls[0][0]).toEqual({
      "1": false,
      "2": true,
      "3": false,
    });
  });

  it("submits with the correct changed values", async () => {
    renderAssignOptions();

    const gateway = screen.getByLabelText("ACCESS_GATEWAY");

    if (gateway) {
      await act(() => {
        fireEvent.click(gateway);

        fireEvent.submit(screen.getByRole("button"));
      });

      expect(mockSubmit.mock.calls[0][0]).toEqual({
        "1": true,
        "2": true,
        "3": false,
      });
    } else {
      fail("Input (gateway) does not exist");
    }
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderAssignOptions());
  });
});
