import { faker } from "@faker-js/faker";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "./requests";

const mockResponse = {
  name: faker.person.fullName(),
};

const mockPayload = {
  query: faker.string.alpha(),
};

const mockToken = faker.string.uuid();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
) as jest.Mock;

jest.mock("js-cookie", () => ({
  get: () =>
    JSON.stringify({
      access_token: mockToken,
    }),
}));

describe("Requests utils", () => {
  afterEach(() => {
    // jest.resetAllMocks();
  });

  it("getRequest", async () => {
    const response = await getRequest("/url", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      `/url?query=${mockPayload.query}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );

    expect(responseJson).toEqual(mockResponse);
  });

  it("postRequest", async () => {
    const response = await postRequest("/url", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(responseJson).toEqual(mockResponse);
  });

  it("putRequest", async () => {
    const response = await putRequest("/url", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(responseJson).toEqual(mockResponse);
  });

  it("patchRequest", async () => {
    const response = await patchRequest("/url", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(responseJson).toEqual(mockResponse);
  });

  it("deleteRequest", async () => {
    const response = await deleteRequest("/url", {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
    });
    expect(responseJson).toEqual(mockResponse);
  });
});
