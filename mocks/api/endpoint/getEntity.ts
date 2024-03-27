import { Server } from "miragejs";

export default function getEntity(server: Server) {
  return server.get("/endpoint", () => ({}));
}
