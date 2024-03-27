import { createServer, Server } from "miragejs";
import endpointRoutes from "./api/endpoint";

type ServerRoute = (
  server: Server
) => Server["get"] | Server["post"] | Server["patch"] | Server["delete"];

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    seeds() {},
    routes() {
      this.urlPrefix = process.env.NEXT_PUBLIC_API_V1_URL || "";

      [...endpointRoutes].forEach(route => {
        route(this);
      });
    },
  });
}
