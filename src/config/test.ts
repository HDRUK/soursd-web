expect.extend({
  toBeControlledBy(area: HTMLElement, trigger: HTMLElement) {
    const areaId = area?.getAttribute("id");
    const triggerControls = trigger?.getAttribute("aria-controls");

    return {
      message: () => "Test failure",
      pass:
        Boolean(areaId) &&
        Boolean(triggerControls) &&
        areaId === triggerControls,
    };
  },
});
