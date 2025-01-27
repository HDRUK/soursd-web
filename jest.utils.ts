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

function mockFailedJson<T>(data: T, status = 404) {
  return {
    ok: false,
    status,
    json: async () => ({
      message: ResponseMessageType.FAILURE,
      data,
    }),
  };
}

function mockPagedResults<T>(
  data: T[],
  page: number = 1,
  perPage: number = 25
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    last_page: data.length / perPage,
    current_page: page,
    data: paginatedData,
  };
}

export { mock200Json, mockFailedJson, mockPagedResults };
