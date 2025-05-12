import { anyIncludes, capitaliseFirstLetter } from "./string";
import { filterColumns } from "./table";

describe("filterColumns", () => {
  test("should filter and merge columns", () => {
    expect(
      filterColumns(
        [
          {
            id: "name",
            header: "Name",
          },
          {
            id: "email",
            header: "Email",
          },
        ],
        ["name"],
        [
          {
            id: "status",
            header: "Status",
          },
        ]
      )
    ).toEqual([
      {
        id: "name",
        header: "Name",
      },
      {
        id: "status",
        header: "Status",
      },
    ]);
  });
});
