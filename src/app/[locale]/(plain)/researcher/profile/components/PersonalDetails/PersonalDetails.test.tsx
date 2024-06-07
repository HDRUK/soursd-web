import { mockedUser } from "@/mocks/data/user";
import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import PersonalDetails, { PersonalDetailsProps } from "./PersonalDetails";

const mockSubmit = jest.fn();
const user = mockedUser();

const renderPersonalDetailsForm = (props?: Partial<PersonalDetailsProps>) => {
  return render(
    <PersonalDetails
      user={user}
      mutateState={{ isLoading: false, isError: false }}
      onSubmit={mockSubmit}
      {...props}
    />
  );
};

describe("<PersonalDetails />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("has no accessibility validations", async () => {
    const { container } = renderPersonalDetailsForm();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("submits when values are defined", async () => {
    renderPersonalDetailsForm();

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
    });

    const { first_name: firstName, last_name: lastName, email } = user;

    expect(mockSubmit.mock.calls[0][0]).toEqual({ firstName, lastName, email });
  });

  it("shows an error", async () => {
    renderPersonalDetailsForm({
      mutateState: {
        isError: true,
        isLoading: false,
        error: "submitError",
      },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
    });

    expect(
      screen.getByRole("alert").querySelector(".MuiAlert-message")?.innerHTML
    ).toEqual(
      'There was a problem updating your details. Please try again or contact us at <a href="mailto:contact@speedi.com">contact@speedi.com</a>'
    );
  });

  it("does not submit when values are missing", async () => {
    renderPersonalDetailsForm();

    const lastName = screen.getByLabelText("Last name").querySelector("input");

    if (lastName) {
      await act(() => {
        fireEvent.change(lastName, {
          target: {
            value: "",
          },
        });

        fireEvent.submit(screen.getByRole("button", { name: /Save/i }));
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    } else {
      fail("Last name does not exist");
    }
  });
});
