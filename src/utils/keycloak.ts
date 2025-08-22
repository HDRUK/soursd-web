import { AccountType } from "@/types/accounts";
import keycloakConfig from "../config/keycloak";

const getLoginUrl = () => {
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
  window.location.href = getLoginUrl();
};

const getLogoutUrl = () => {
  const logoutUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    post_logout_redirect_uri: keycloakConfig.redirectUriLogout,
  });

  return `${logoutUrl}?${params.toString()}`;
};

const handleLogout = () => {
  window.location.href = getLogoutUrl();
};

const getRegisterUrl = (selectedAccountType?: AccountType | null) => {
  const registerUrl = `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/registrations`;
  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    scope: "openid profile email",
    redirect_uri: keycloakConfig.redirectUriRegister,
    response_type: "code",
    ...(selectedAccountType && { state: selectedAccountType.toString() }),
  });

  return `${registerUrl}?${params.toString()}`;
};

const handleRegister = (selectedAccountType?: AccountType | null) => {
  window.location.href = getRegisterUrl(selectedAccountType);
};

export {
  handleLogin,
  handleLogout,
  handleRegister,
  getRegisterUrl,
  getLoginUrl,
  getLogoutUrl,
};
