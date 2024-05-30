import { ResponseJson, ResponseTranslations } from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";

function getHeadersWithAuthorisation(headers?: HeadersInit) {
  const bearerToken = localStorage.getItem("bearerToken");

  return {
    ...(bearerToken && {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    }),
    "content-type": "application/json;charset=UTF-8",
    ...headers,
  };
}

function handleResponseError<T>(
  response: ResponseJson<T>,
  messages: ResponseTranslations
) {
  if (!response.ok) {
    return new Error(
      response.status === 401
        ? messages["401"]?.message
        : messages.error?.message
    );
  }

  return null;
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
  console.log({
    ...options,
    method: "POST",
    headers: {
      ...getHeadersWithAuthorisation(options?.headers),
      ...options?.headers,
    },
    body: JSON.stringify(payload),
  });

  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: {
      ...getHeadersWithAuthorisation(options?.headers),
      ...options?.headers,
    },
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

export {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  deleteRequest,
  handleResponseError,
};
