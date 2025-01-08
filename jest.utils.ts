import { ResponseMessageType } from "@/consts/requests";

expect.extend({
  toBeControlledBy(
    area: HTMLElement,
    trigger: HTMLElement
  ): jest.CustomMatcherResult {
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

function mock200Json<T>(data: T) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      message: ResponseMessageType.SUCCESS,
      data,
    }),
  };
}

function mockPagedResults<T>(data: T) {
  return {
    current_page: 1,
    data,
  };
}

export { mock200Json, mockPagedResults };
