import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { NotificationsTypes, useNotifications } from "./Notifications";

const TestComponent = () => {
  const { error, add, remove } = useNotifications(["TEST"]);

  const handleAdd = () => {
    add(NotificationsTypes.ERROR, "TEST", "There has been an error");
  };

  const handleRemove = () => {
    remove(NotificationsTypes.ERROR, "TEST");
  };

  return (
    <div>
      {error.TEST}
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

describe("<NotificationsProvider />", () => {
  it("shows an error", async () => {
    render(<TestComponent />);

    act(() => {
      const addButton = screen.getByText("Add");
      fireEvent.click(addButton);
    });

    expect(screen.getByText("There has been an error")).toBeInTheDocument();
  });

  it("removes an error", async () => {
    render(<TestComponent />);

    act(() => {
      const addButton = screen.getByText("Add");
      fireEvent.click(addButton);

      const removeButton = screen.getByText("Remove");
      fireEvent.click(removeButton);
    });

    expect(
      screen.queryByText("There has been an error")
    ).not.toBeInTheDocument();
  });
});
