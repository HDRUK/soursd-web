import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import ContactForm from "./ContactForm";

const mockSubmit = jest.fn();

describe("<ContacForm />", () => {
  it("has no accessibility validations", async () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays error state when values are not defined", async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits when values are defined", async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    const name = screen.getByLabelText("name").querySelector("input");
    const email = screen.getByLabelText("email").querySelector("input");
    const message = screen.getByLabelText("message").querySelector("input");

    if (name && email && message) {
      fireEvent.change(name, {
        target: {
          value: faker.internet.displayName(),
        },
      });
      fireEvent.change(email, {
        target: {
          value: faker.internet.email(),
        },
      });
      fireEvent.change(message, { target: { value: faker.string.sample() } });

      await waitFor(() => {
        fireEvent.submit(screen.getByRole("button"));
      });

      expect(mockSubmit).toHaveBeenCalled();
    } else {
      fail("Name, email or message do not exist");
    }
  });
});
