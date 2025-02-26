import * as yup from "yup";
import { isFieldRequired, getCheckboxFormValuesFromIntersection } from "./form";

describe("isFieldRequired", () => {
  it("should return true for a required field", () => {
    const schema = yup.object({
      name: yup.string().required(),
    });
    expect(isFieldRequired(schema, "name")).toBe(true);
  });

  it("should return false for an optional field", () => {
    const schema = yup.object({
      age: yup.number(),
    });
    expect(isFieldRequired(schema, "age")).toBe(false);
  });

  it("should return true for a required nested field", () => {
    const schema = yup.object({
      user: yup.object({
        email: yup.string().required(),
      }),
    });
    expect(isFieldRequired(schema, "user.email")).toBe(true);
  });

  it("should return false for an optional nested field", () => {
    const schema = yup.object({
      user: yup.object({
        phone: yup.string(),
      }),
    });
    expect(isFieldRequired(schema, "user.phone")).toBe(false);
  });

  it("should return true for a required field inside an array", () => {
    const schema = yup.object({
      users: yup.array(
        yup.object({
          username: yup.string().required(),
        })
      ),
    });
    expect(isFieldRequired(schema, "users.0.username")).toBe(true);
  });

  it("should return false for an optional field inside an array", () => {
    const schema = yup.object({
      users: yup.array(
        yup.object({
          nickname: yup.string(),
        })
      ),
    });
    expect(isFieldRequired(schema, "users.0.nickname")).toBe(false);
  });

  it("should return false for a non-existent field", () => {
    const schema = yup.object({
      name: yup.string().required(),
    });
    expect(isFieldRequired(schema, "email")).toBe(false);
  });

  it("should return false for a non-existent nested field", () => {
    const schema = yup.object({
      user: yup.object({
        email: yup.string().required(),
      }),
    });
    expect(isFieldRequired(schema, "user.address")).toBe(false);
  });
});

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
