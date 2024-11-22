import keycloakConfig from "@/config/keycloak";

const handleLogin = () => {
  const authUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    response_type: "code",
    redirect_uri: keycloakConfig.redirectUriLogin,
    scope: "openid profile email",
  });

  window.location.href = `${authUrl}?${params.toString()}`;
};

const handleLogout = () => {
  const logoutUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    post_logout_redirect_uri: keycloakConfig.redirectUriLogout,
  });

  window.location.href = `${logoutUrl}?${params.toString()}`;
};
// TODO: Register user functionality is a WIP and needs to be done once the appropriate page has been implemented
// const registerUser = () => {
//   console.log("test");
// };

export { handleLogin, handleLogout };
