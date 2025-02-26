import { isProduction } from "@/utils/application";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction(),
  path: "/",
};

export { COOKIE_OPTIONS };
