import { Server } from "miragejs";

export default (server: Server) => {
  return server.get("/endpoint", () => ({}));
};
