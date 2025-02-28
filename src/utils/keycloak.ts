import keycloakConfig from "@/config/keycloak";

const getKeycloakLoginUrl = () => {
  const authUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    response_type: "code",
    redirect_uri: keycloakConfig.redirectUriLogin,
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const handleLogin = () => {
  window.location.href = getKeycloakLoginUrl();
};

const handleLogout = () => {
  const logoutUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    post_logout_redirect_uri: keycloakConfig.redirectUriLogout,
  });

  window.location.href = `${logoutUrl}?${params.toString()}`;
};

const handleRegister = () => {
  const registerUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/registrations`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    scope: "openid profile email",
    redirect_uri: keycloakConfig.redirectUriRegister,
    response_type: "code",
  });

  window.location.href = `${registerUrl}?${params.toString()}`;
};

export { handleLogin, handleLogout, handleRegister, getKeycloakLoginUrl };
