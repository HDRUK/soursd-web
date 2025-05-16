import { mockedBannerContent } from "@/mocks/data/cms";
import { Message, MessageProps } from "../../components/Message";

export default function BannerMessage(props: MessageProps) {
  return (
    <Message variant="filled" severity="warning" {...props}>
      {mockedBannerContent()}
    </Message>
  );
}
