import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "../../utils/testUtils";
import UserCompleteStatus, {
  UserCompleteStatusProps,
} from "./UserCompleteStatus";

const renderTest = (props?: Partial<UserCompleteStatusProps>) =>
  render(
    <UserCompleteStatus
      user={mockedUser({ profile_completed_at: "2024-01-01T00:00:00Z" })}
      {...props}
    />
  );

describe("<UserCompleteStatus />", () => {
  it("shows the route", async () => {
    renderTest();

    expect(screen.getByText(/Profile complete/)).toBeInTheDocument();
  });

  it("shows an error", async () => {
    renderTest({
      user: mockedUser({ profile_completed_at: null }),
    });

    expect(screen.getByText("Profile not complete")).toBeInTheDocument();
  });
});
