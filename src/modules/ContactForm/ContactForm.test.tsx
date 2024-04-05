import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import ContactForm from "./ContactForm";

const mockSubmit = jest.fn();

describe("<ContactForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays error state when values are not defined", async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    await act(() => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits when values are defined", async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    const name = screen.getByLabelText("name").querySelector("input");
    const email = screen.getByLabelText("email").querySelector("input");
    const message = screen.getByLabelText("message").querySelector("input");

    const nameValue = faker.internet.displayName();
    const emailValue = faker.internet.email();
    const messageValue = faker.string.sample();

    if (name && email && message) {
      await act(() => {
        fireEvent.change(name, {
          target: {
            value: nameValue,
          },
        });
        fireEvent.change(email, {
          target: {
            value: emailValue,
          },
        });
        fireEvent.change(message, { target: { value: messageValue } });

        fireEvent.submit(screen.getByRole("button"));
      });

      expect(mockSubmit).toHaveBeenCalled();
    } else {
      fail("Name, email or message does not exist");
    }
  });
});
