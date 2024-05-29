import { ResponseTranslations } from "@/types/requests";
import { handleResponseError, postRequest } from "../requests";
import { RegisterPayload } from "./types";

export default async (
  payload: RegisterPayload,
  messages: ResponseTranslations
) => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    payload
  );

  const error = handleResponseError(response, messages);

  if (error) return Promise.reject(error);

  return response.data;
};

// Sign up integration for researcher
// - modification to form fields
// - some error state management
// - some api integration
// - ammending tests

// Filter, search, sort, api
// Table, checkboxes

// - common components

// Actions / menu - assi9gn meta data

// Viewing users details

// 372, 288, 352, 343, 345, 347
