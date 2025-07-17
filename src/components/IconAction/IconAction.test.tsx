import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import IconAction, { IconActionProps } from "./IconAction";

const setupTest = (props?: Partial<IconActionProps>) =>
  render(
    <IconAction {...props}>
      <DeleteIcon titleAccess="Delete" />
    </IconAction>
  );

describe("<IconAction />", () => {
  it("renders loading state when 'loading' is true", async () => {
    setupTest({
      loading: true,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByTitle("Delete")).not.toBeInTheDocument();
  });

  it("renders the icon", () => {
    setupTest();

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
