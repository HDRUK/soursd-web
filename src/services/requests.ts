import { ResponseMessageType } from "@/consts/requests";
import {
  QueryOptions,
  QueryPayload,
  ResponseJson,
  ResponseTranslations,
} from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";
import cookies from "js-cookie";

function getHeadersWithAuthorisation(headers?: HeadersInit) {
  const accessToken = cookies.get("access_token") || ""

  return {
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
    ...headers,
  };
}

function handleResponseError(
  response: Response,
  messages: ResponseTranslations
) {
  if (!response?.ok) {
    return new Error(
      response?.status === 401
        ? messages["401"]?.message
        : messages.error?.message
    ).message;
  }

  return null;
}

function handleDataError<T>(
  data: ResponseJson<T>,
  messages: ResponseTranslations
) {
  if (data.message !== ResponseMessageType.SUCCESS) {
    return new Error(messages.error?.message);
  }

  return null;
}

async function handleJsonResponse(
  response: Response,
  messages: ResponseTranslations
) {
  const responseError = handleResponseError(response, messages);
  if (responseError) return Promise.reject(responseError);

  const data = await response.json();

  const dataError = handleDataError(data, messages);

  if (dataError) return Promise.reject(dataError);

  return Promise.resolve(data);
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

async function deleteRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: QueryOptions
) {
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
  handleJsonResponse,
};
