import yup from "@/config/yup";

function getCheckboxFormValuesFromIntersection(
  parent: { label: string; id: number | string }[],
  subset: { id: number | string }[]
) {
  return parent.reduce((accumulator, currentValue) => {
    const { id } = currentValue;

    return {
      ...accumulator,
      [id]: !!subset.find(
        ({ id: subsetId }) => subsetId.toString() === id.toString()
      ),
    };
  }, {});
}

function isFieldRequired(
  schema: yup.AnyObjectSchema,
  fieldPath: string
): boolean {
  const fields = fieldPath.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentSchema: any = schema.describe();

  currentSchema = fields.reduce((acc, field) => {
    if (!acc) return null;

    if (acc.type === "array" && !Number.isNaN(Number(field))) {
      return acc.innerType || null;
    }

    return acc.fields?.[field] || null;
  }, currentSchema);

  return currentSchema ? !currentSchema.optional : false;
}

export { getCheckboxFormValuesFromIntersection, isFieldRequired };
