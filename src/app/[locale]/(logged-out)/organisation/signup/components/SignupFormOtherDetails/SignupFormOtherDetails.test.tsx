import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import SignupFormOtherDetails, {
  SignupFormOtherDetailsProps,
} from "./SignupFormOtherDetails";

const mockOnSubmit = jest.fn();
const mockOnPrevious = jest.fn();

const DEFAULT_OTHER_DETAILS_VALUES = {
  address_1: "",
  address_2: "",
  town: "",
  county: "",
  country: "United Kingdom",
  postcode: "",
  dsptk_ods_code: "",
  iso_27001_certified: false,
  ce_certified: false,
  ce_certification_num: "",
};

const renderSignupForm = (props?: Partial<SignupFormOtherDetailsProps>) => {
  return render(
    <SignupFormOtherDetails
      onPrevious={mockOnPrevious}
      defaultValues={DEFAULT_OTHER_DETAILS_VALUES}
      onSubmit={mockOnSubmit}
      {...props}
    />
  );
};

describe("<SignupFormOtherDetails />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderSignupForm();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("does not submit when there are errors", async () => {
    renderSignupForm();

    fireEvent.submit(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("shows an error", async () => {
    renderSignupForm();

    fireEvent.submit(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("goes to previous panel", async () => {
    renderSignupForm();

    fireEvent.click(screen.getByRole("button", { name: /Previous/i }));

    await waitFor(() => {
      expect(mockOnPrevious).toHaveBeenCalledWith(DEFAULT_OTHER_DETAILS_VALUES);
    });
  });

  it("submits when values are defined", async () => {
    renderSignupForm();

    const address_1 = screen.getByLabelText(/Address 1/);
    const town = screen.getByLabelText(/Town/);
    const county = screen.getByLabelText(/County/);
    const postcode = screen.getByLabelText(/Postcode/);

    const address_1Value = faker.string.sample();
    const townValue = faker.string.sample();
    const countyValue = faker.string.sample();
    const postcodeValue = "NR10 0PL";

    if (address_1 && town && county && postcode) {
      fireEvent.change(address_1, {
        target: {
          value: address_1Value,
        },
      });
      fireEvent.change(town, {
        target: {
          value: townValue,
        },
      });
      fireEvent.change(county, {
        target: {
          value: countyValue,
        },
      });
      fireEvent.change(postcode, {
        target: {
          value: postcodeValue,
        },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Next/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    } else {
      fail("Address 1, town, county or postcode do not exist");
    }
  });
});
