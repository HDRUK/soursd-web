export default async function logout() {
  return fetch("/api/auth/token", {
    method: "POST",
    credentials: "include",
  });
}
