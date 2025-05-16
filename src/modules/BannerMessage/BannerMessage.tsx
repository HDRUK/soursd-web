import { Message, MessageProps } from "../../components/Message";
import { mockedBannerContent } from "@/mocks/data/cms";

export default function BannerMessage(props: MessageProps) {
  return (
    <Message variant="filled" severity="warning" {...props}>
      {mockedBannerContent()}
    </Message>
  );
}
