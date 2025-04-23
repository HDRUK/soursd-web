import { mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import { Organisation } from "@/types/application";
import { renderOrganisationsNameCell } from "./cells";

const CellTest = ({ orgs }: { orgs: Organisation | Organisation[] }) => {
  return renderOrganisationsNameCell(orgs);
};

describe("Cells utils", () => {
  describe("renderOrganisationsNameCell", () => {
    it("handles 1 org", async () => {
      const org = mockedOrganisation({
        organisation_name: "Organisation 1",
      });

      render(<CellTest orgs={org} />);

      expect(screen.getByText(org.organisation_name)).toBeInTheDocument();
    });

    it("handles multiple orgs", async () => {
      const orgs = [
        mockedOrganisation({
          organisation_name: "Organisation 1",
        }),
        mockedOrganisation({
          organisation_name: "Organisation 2",
        }),
      ];

      render(<CellTest orgs={orgs} />);

      expect(
        screen.getByText(
          `${orgs[0].organisation_name}, ${orgs[1].organisation_name}`
        )
      ).toBeInTheDocument();
    });

    it("handles no org", async () => {
      render(<CellTest orgs={[]} />);

      expect(screen.getByText("Not affiliated")).toBeInTheDocument();
    });
  });
});
