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
  let currentSchema: any = schema.describe();

  for (const field of fields) {
    if (currentSchema.type === "array" && !isNaN(Number(field))) {
      currentSchema = currentSchema.innerType;
      if (!currentSchema) {
        return false;
      }
      continue;
    }

    if (!currentSchema.fields || !currentSchema.fields[field]) {
      return false;
    }
    currentSchema = currentSchema.fields[field];
  }
  return !currentSchema.optional;
}

export { getCheckboxFormValuesFromIntersection, isFieldRequired };
