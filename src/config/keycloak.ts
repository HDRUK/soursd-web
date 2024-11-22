const keycloakConfig = {
  realm: `${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
  clientId: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`,
  clientSecret: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET}`,
  authServerUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}`,
  redirectUriLogin: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGIN}`,
  redirectUriLogout: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGOUT}`,
};

export default keycloakConfig;
