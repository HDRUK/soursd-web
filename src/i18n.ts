import { getRequestConfig } from "next-intl/server";
import messages from "@/config/messages/en.json";

export default getRequestConfig(async () => ({
  messages,
}));
