import { QueryPayload } from "@/types/requests";
import { objectToQuerystring } from "@/utils/requests";
import { getHeadersWithAuthorization } from "./requestHelpers";

async function request<T>(
  method: string,
  url: string,
  payload?: QueryPayload<T>,
  options?: RequestInit
) {
  let defaultContentType;

  if (!(payload instanceof FormData)) {
    defaultContentType = "application/json;charset=UTF-8";
  }

  const headers = await getHeadersWithAuthorization({
    ...(defaultContentType && {
      "content-type": defaultContentType,
    }),
    ...options?.headers,
  });

  const body =
    payload instanceof Function
      ? payload()
      : payload instanceof FormData
        ? payload
        : JSON.stringify(payload);

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body,
  });

  return response;
}

async function getRequest<T>(url: string, payload?: T, options?: RequestInit) {
  const response = await request(
    "GET",
    `${url}${payload ? `?${objectToQuerystring(payload)}` : ""}`,
    payload,
    options
  );
  return response;
}

async function postRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: RequestInit
) {
  const response = await request("POST", url, payload, options);

  return response;
}

async function patchRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: Omit<RequestInit, "body">
) {
  const response = await request("PATCH", url, payload, options);
  return response;
}

async function putRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: RequestInit
) {
  const response = await request("PUT", url, payload, options);
  return response;
}

async function deleteRequest<T>(
  url: string,
  payload?: QueryPayload<T>,
  options?: RequestInit
) {
  const response = await request("DELETE", url, payload, options);
  return response;
}

export { deleteRequest, getRequest, patchRequest, postRequest, putRequest };
