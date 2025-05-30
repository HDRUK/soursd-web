import { render, screen, userEvent } from "../../utils/testUtils";
import ActionValidationStatus, {
  UseApprovalHook,
} from "./ActionValidationStatus";

describe("<ActionValidationStatus />", () => {
  const approveMock = jest.fn();
  const rejectMock = jest.fn();

  const createMockHook = (
    approved = 0,
    isLoading = false
  ): UseApprovalHook<{ organisationId: number; custodianId: number }> => {
    return () => ({
      data: {
        approved,
        project_id: 1,
        user_id: 2,
        custodian_id: 3,
        comment: "Mock comment",
      },
      approve: approveMock,
      reject: rejectMock,
      isLoading,
      isError: false,
    });
  };

  const renderComponent = (
    hook: UseApprovalHook<{ organisationId: number; custodianId: number }>,
    hookParams = { organisationId: 1, custodianId: 2 }
  ) =>
    render(
      <ActionValidationStatus useApprovalHook={hook} hookParams={hookParams} />
    );

  it("it can approve", async () => {
    renderComponent(createMockHook(0, false));
    expect(
      await screen.findByRole("textbox", { name: /comment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update status/i })
    ).toBeDisabled();

    const commentBox = screen.getByRole("textbox", { name: /comment/i });
    const statusSelect = screen.getByRole("combobox");
    await userEvent.click(statusSelect);

    const approvedOption = await screen.findByRole("option", {
      name: /^Approved$/,
    });
    await userEvent.click(approvedOption);

    await userEvent.type(commentBox, "Approving this");

    const button = screen.getByRole("button", { name: /update status/i });
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(approveMock).toHaveBeenCalledWith("Approving this");
  });

  it("it can reject", async () => {
    renderComponent(createMockHook(1, false));
    expect(
      await screen.findByRole("textbox", { name: /comment/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /update status/i })
    ).toBeDisabled();

    const commentBox = screen.getByRole("textbox", { name: /comment/i });
    const statusSelect = screen.getByRole("combobox");
    await userEvent.click(statusSelect);

    const notApprovedOption = await screen.findByRole("option", {
      name: /^Not approved$/,
    });

    await userEvent.click(notApprovedOption);

    await userEvent.type(commentBox, "Rejecting this");

    const button = screen.getByRole("button", { name: /update status/i });
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(rejectMock).toHaveBeenCalledWith("Rejecting this");
  });
});
