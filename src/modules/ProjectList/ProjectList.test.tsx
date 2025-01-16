import { useStore } from "@/data/store";
import AppRouterContextProviderMock from "@/mocks/context/router";
import { mockedProject } from "@/mocks/data/project";
import { mockedUser } from "@/mocks/data/user";
import { commonAccessibilityTests, render } from "@/utils/testUtils";
import ProjectList from "./ProjectList";

jest.mock("@/data/store");

const mockedPush = jest.fn();

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

describe("<ProjectList />", () => {
  commonAccessibilityTests(
    render(
      <AppRouterContextProviderMock router={{ push: mockedPush }}>
        <ProjectList projects={[mockedProject()]} />
      </AppRouterContextProviderMock>
    )
  );
});
