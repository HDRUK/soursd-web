import {
  QueryOptions,
  QueryPayload,
  ResponseTranslations,
} from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";
import cookies from "js-cookie";

function getHeadersWithAuthorisation(headers?: HeadersInit) {
  const auth = JSON.parse(cookies.get("auth") || "{}");

  console.log("**** AUTH", auth);

  return {
    ...(auth.access_token && {
      Authorization: `Bearer ${auth.access_token}`,
    }),
    ...headers,
  };
}

function handleResponseError(
  response: Response,
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

  return response;
}

async function postRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: {
      ...getHeadersWithAuthorisation(options?.headers),
      ...options?.headers,
    },
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function patchRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: Omit<RequestInit, "body">
) {
  const response = await fetch(url, {
    ...options,
    method: "PATCH",
    headers: getHeadersWithAuthorisation(options?.headers),
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function putRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
  const response = await fetch(url, {
    ...options,
    method: "PUT",
    headers: getHeadersWithAuthorisation(options?.headers),
    body: payload instanceof Function ? payload() : JSON.stringify(payload),
  });

  return response;
}

async function deleteRequest(url: string, options?: QueryOptions) {
  const response = await fetch(url, {
    ...options,
    method: "DELETE",
    headers: getHeadersWithAuthorisation(options?.headers),
  });

  return response;
}

export {
  deleteRequest,
  getRequest,
  handleResponseError,
  patchRequest,
  postRequest,
  putRequest,
};
