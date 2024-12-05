import { useStore } from "@/data/store";
import { act, render } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { mockedUser } from "@/mocks/data/user";
import { mockedProject } from "@/mocks/data/project";
import ProjectList from "./ProjectList";

jest.mock("@/data/store");

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(defaultUser);

describe("<ProjectList />", () => {
  it("has no accessibility validations", async () => {
    const data = mockedProject();
    const { container } = render(<ProjectList projects={[data]} />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
