import { render, screen } from "@/utils/testUtils";
import Message, { MessageProps } from "./Message";
import MessageContent from "./MessageContent";
import MessageTitle from "./MessageTitle";

const renderMessage = (props?: Partial<MessageProps>) => {
  return render(
    <Message {...props}>
      <MessageTitle>Title</MessageTitle>
      <MessageContent>Content</MessageContent>
    </Message>
  );
};

describe("<Message />", () => {
  it("shows a notification message", async () => {
    renderMessage({
      variant: "notification",
    });

    const message = await screen.findByRole("alert");

    if (message) {
      expect(message.parentNode).toHaveRole("presentation");
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    } else {
      fail("There is no alert in the DOM");
    }
  });

  it("shows a block message", () => {
    const { container } = renderMessage();

    expect(container.childNodes[0]).toHaveRole("alert");
  });
});
