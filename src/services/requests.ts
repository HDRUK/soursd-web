import { objectToQuerystring } from "@/utils/requests";

function getHeadersWithAuthorisation(headers?: HeadersInit) {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json;charset=UTF-8",
    ...headers,
  };
}

async function getRequest<T>(url: string, payload?: T, options?: RequestInit) {
  const response = await fetch(
    `${url}${payload ? `?${objectToQuerystring(payload)}` : ""}`,
    {
      ...options,
      headers: getHeadersWithAuthorisation(options?.headers),
      ...(options?.body && { body: JSON.stringify(options?.body) }),
    }
  );

  return response.json();
}

async function postRequest<T>(
  url: string,
  payload?: T,
  options?: Omit<RequestInit, "body">
) {
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: getHeadersWithAuthorisation(options?.headers),
    body: JSON.stringify(payload),
  });

  return response.json();
}

async function patchRequest<T>(
  url: string,
  payload?: T,
  options?: Omit<RequestInit, "body">
) {
  const response = await fetch(url, {
    ...options,
    method: "PATCH",
    headers: getHeadersWithAuthorisation(options?.headers),
    body: JSON.stringify(payload),
  });

  return response.json();
}

async function putRequest<T>(
  url: string,
  payload?: T,
  options?: Omit<RequestInit, "body">
) {
  const response = await fetch(url, {
    ...options,
    method: "PUT",
    headers: getHeadersWithAuthorisation(options?.headers),
    body: JSON.stringify(payload),
  });

  return response.json();
}

async function deleteRequest(url: string, options?: Omit<RequestInit, "body">) {
  const response = await fetch(url, {
    ...options,
    method: "DELETE",
    headers: getHeadersWithAuthorisation(options?.headers),
  });

  return response.json();
}

export { getRequest, postRequest, patchRequest, putRequest, deleteRequest };
