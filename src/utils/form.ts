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

export { getCheckboxFormValuesFromIntersection };
