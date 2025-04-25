import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import Projects from "./Projects";
import { ROUTES } from "@/consts/router";
import { injectParamsIntoPath } from "@/utils/application";

const mockPush = jest.fn();

jest.mock("@/i18n/routing", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams("title=test")),
}));

const renderProjects = () => {
  return render(<Projects />);
};

describe("<Projects />", () => {
  it("project is created", async () => {
    renderProjects();

    fireEvent.click(screen.getByRole("button", { name: /Add new project/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        injectParamsIntoPath(ROUTES.profileCustodianProjectsSafeProject.path, {
          id: 1,
        })
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects());
  });
});
