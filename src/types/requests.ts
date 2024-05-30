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

interface ResponseJson<T> {
  data: T;
  message: string;
  status: number;
  ok: boolean;
}

export type { ResponseJson, ResponseTranslation, ResponseTranslations };
