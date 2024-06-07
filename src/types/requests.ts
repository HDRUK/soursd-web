interface ResponseTranslation {
  message: string;
}

interface ResponseTranslations {
  "401"?: ResponseTranslation;
  "403"?: ResponseTranslation;
  "404"?: ResponseTranslation;
  "500"?: ResponseTranslation;
  error?: ResponseTranslation;
}

type ResponseJson<T> = Response & {
  data: T;
  message: string;
};

type QueryOptions = Omit<RequestInit, "body">;
type QueryPayload<T> = T | (() => BodyInit & T);

export type {
  ResponseJson,
  ResponseTranslation,
  ResponseTranslations,
  QueryOptions,
  QueryPayload,
};
