import Keycloak from "keycloak-js";

const keycloak =
  typeof document !== "undefined"
    ? new Keycloak({
        url: "https://keycloak.dev.hdruk.cloud/",
        realm: "SOURSD",
        clientId: "speedi-registry-app",
      })
    : null;

export default keycloak;
