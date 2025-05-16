import { faker } from "@faker-js/faker";
import { ResponseMessageType } from "../consts/requests";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "./requests";

const mockResponse = {
  data: null,
  message: ResponseMessageType.SUCCESS,
};

const mockPayload = {
  query: faker.string.alpha(),
};

const mockToken = faker.string.uuid();

jest.mock("js-cookie", () => ({
  get: () => mockToken,
}));

describe("Requests utils", () => {
  it("getRequest", async () => {
    const response = await getRequest("/test", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      `/test?query=${mockPayload.query}`,
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
    const response = await postRequest("/test", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/test`, {
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
    const response = await putRequest("/test", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/test`, {
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
    const response = await patchRequest("/test", mockPayload, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/test`, {
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
    const response = await deleteRequest("/test", {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const responseJson = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(`/test`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(responseJson).toEqual(mockResponse);
  });
});
