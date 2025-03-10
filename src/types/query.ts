export type SearchParams = Record<string, string | number | undefined>;

export interface ResponseEmptyError {
  ok: boolean;
  status: 500 | 404 | 400;
  json: () => Promise<{
    message: string;
    data: null;
  }>;
}
