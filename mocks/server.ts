import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

function createServer() {
  return setupServer(
    http.get("/_endpoint_", () => {
      return HttpResponse.json({});
    })
  );
}

function listen(server: SetupServerApi) {
  server.listen();
}

export { createServer, listen };
