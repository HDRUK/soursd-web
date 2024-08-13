import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { act, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import Sections from "./Sections";
import { mockedOrganisation } from "@/mocks/data/organisation";

jest.mock("@/data/store");

const defaultUser = mockedUser();

(useStore as unknown as jest.Mock).mockReturnValue(() => defaultUser);

const renderSections = () => {
  return render(<Sections>Child</Sections>);
};

describe("<Sections />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderSections();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("shows profile is complete", () => {
    (useStore as unknown as jest.Mock).mockReturnValue(
      mockedOrganisation({ idvt_result: true })
    );

    renderSections();

    expect(screen.getByText(/Organisation validated/)).toBeInTheDocument();
  });

  it("shows profile is not complete", () => {
    (useStore as unknown as jest.Mock).mockReturnValue(
      mockedOrganisation({ idvt_result: false })
    );

    renderSections();

    expect(screen.getByText(/Organisation not validated/)).toBeInTheDocument();
  });
});
