import { mockedUser } from "@/mocks/data/user";
import { getCheckboxFormValuesFromIntersection } from "./form";

describe("getCheckboxFormValuesFromIntersection", () => {
  it("gets the correct initials", () => {
    const result = getCheckboxFormValuesFromIntersection(
      [
        {
          label: "Item 1",
          id: 1,
        },
        {
          label: "Item 2",
          id: 2,
        },
      ],
      [
        {
          id: 2,
        },
      ]
    );

    expect(result).toEqual({
      "1": false,
      "2": true,
    });
  });
});

// parent: { label: string; id: number | string }[],
// subset: { id: number | string }[]
