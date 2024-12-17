import { useStore } from "@/data/store";
import { act, render } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { mockedUser } from "@/mocks/data/user";
import { mockedProject } from "@/mocks/data/project";
import AppRouterContextProviderMock from "@/mocks/context/router";
import ProjectList from "./ProjectList";

jest.mock("@/data/store");

const mockedPush = jest.fn();

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

describe("<ProjectList />", () => {
  it("has no accessibility validations", async () => {
    const data = mockedProject();
    const { container } = render(
      <AppRouterContextProviderMock router={{ push: mockedPush }}>
        <ProjectList projects={[data]} />
      </AppRouterContextProviderMock>
    );

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
