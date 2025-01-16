import { isQueriesError, isQueriesFetched, isQueriesLoading } from "./query";

describe("isQueriesFetched", () => {
  it("returns true when all queries are complete", async () => {
    const results = isQueriesFetched([
      {
        isFetched: true,
      },
      {
        isFetched: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns true when any query is incomplete", async () => {
    const results = isQueriesFetched([
      {
        isFetched: false,
      },
      {
        isFetched: true,
      },
    ]);

    expect(results).toEqual(false);
  });
});

describe("isQueriesLoading", () => {
  it("returns true when any query is running", async () => {
    const results = isQueriesLoading([
      {
        isLoading: false,
      },
      {
        isLoading: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns false when no query is running", async () => {
    const results = isQueriesLoading([
      {
        isLoading: false,
      },
      {
        isFetched: false,
      },
    ]);

    expect(results).toEqual(false);
  });
});

describe("isQueriesError", () => {
  it("returns true when any query has an error", async () => {
    const results = isQueriesError([
      {
        isError: false,
      },
      {
        isError: true,
      },
    ]);

    expect(results).toEqual(true);
  });

  it("returns false when no query has an error", async () => {
    const results = isQueriesError([
      {
        isError: false,
      },
      {
        isError: false,
      },
    ]);

    expect(results).toEqual(false);
  });
});
