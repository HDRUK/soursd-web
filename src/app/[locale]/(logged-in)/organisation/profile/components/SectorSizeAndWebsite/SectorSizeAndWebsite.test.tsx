import { render, screen } from "@/utils/testUtils";
import SectorSizeAndWebsite from "./SectorSizeAndWebsite";

function setupTest() {
  return render(<SectorSizeAndWebsite />);
}

function getAllInputs() {
  return [/Sector/, /Website/, /Size/];
}

describe("<SectorSizeAndWebsite />", () => {
  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });
  //   setupTest();

  //   const form = await screen.findByRole("form", { name: "Name and address" });
  //   fireEvent.submit(form);

  //   const {
  //     address_1,
  //     address_2,
  //     county,
  //     country,
  //     town,
  //     postcode,
  //     organisation_name,
  //   } = organisation;

  //   await waitFor(() => {
  //     expect(patchProps.onSubmit).toHaveBeenCalledWith({
  //       address_1,
  //       address_2,
  //       county,
  //       country,
  //       town,
  //       postcode,
  //       organisation_name,
  //     });
  //   });
  // });

  // it("does not submit the form when values are cleared", async () => {
  //   setupTest();

  //   const inputs = getAllInputs();

  //   inputs.forEach(async selector => {
  //     const element = screen.getAllByLabelText(selector)[0];

  //     await userEvent.click(element);
  //     await userEvent.clear(element);
  //   });

  //   const form = await screen.findByRole("form", { name: "Name and address" });
  //   fireEvent.submit(form);

  //   await waitFor(() => {
  //     expect(patchProps.onSubmit).not.toHaveBeenCalled();
  //   });
  // });
});
