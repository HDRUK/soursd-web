import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import OrganisationsSubsidiaries from "./OrganisationsSubsidiaries";

const mockRefetch = jest.fn();

const setupTest = () => {
  return render(
    <OrganisationsSubsidiaries
      onDeleteSuccess={mockRefetch}
      onEditSuccess={mockRefetch}
    />
  );
};

function getAllMandatoryInputs() {
  return [/Name/i, /Address 1/i, /Town \/ City/i, "Postcode"];
}

function fillAllMandatoryInputs() {
  getAllMandatoryInputs().forEach(selector => {
    const element = screen.getByLabelText(selector);

    if (selector === "Postcode") {
      fireEvent.change(element, { target: { value: "sg5 4pf" } });
    } else {
      fireEvent.change(element, {
        target: { value: faker.string.sample() },
      });
    }
  });
}

describe("<OrganisationsSubsidiaries />", () => {
  it("Subsidiary can be created", async () => {
    setupTest();

    fireEvent.click(screen.getByRole("button", { name: /add a subsidiary/i }));

    const saveButton = await screen.findByRole("button", { name: /save/i });

    act(() => {
      fillAllMandatoryInputs();
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("Subsidiary is updated", async () => {
    setupTest();

    fireEvent.click(screen.getByTitle(/edit/i));

    const saveButton = await screen.findByRole("button", { name: /save/i });

    act(() => {
      fillAllMandatoryInputs();
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("Subsidiary is deleted", async () => {
    setupTest();

    fireEvent.click(screen.getByTitle(/delete/i));

    const saveButton = await screen.findByRole("button", { name: /go ahead/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
