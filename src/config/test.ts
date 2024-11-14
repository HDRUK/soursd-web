expect.extend({
  toBeControlledBy(area: HTMLElement, trigger: HTMLElement) {
    const areaId = area?.getAttribute("id");
    const triggerControls = trigger?.getAttribute("aria-controls");

    return {
      message: () =>
        "Trigger does not have the correct associated aria attributes with the area",
      pass:
        Boolean(areaId) &&
        Boolean(triggerControls) &&
        areaId === triggerControls,
    };
  },
});
