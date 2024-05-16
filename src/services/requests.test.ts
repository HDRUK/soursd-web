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

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn().mockReturnValue(mockToken),
  },
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
) as jest.Mock;

describe("Requests utils", () => {
  it("getRequest", async () => {
    const response = await getRequest("/url", mockPayload);

    expect(global.fetch).toHaveBeenCalledWith(
      `/url?query=${mockPayload.query}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it("postRequest", async () => {
    const response = await postRequest("/url", mockPayload);

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(response).toEqual(mockResponse);
  });

  it("putRequest", async () => {
    const response = await putRequest("/url", mockPayload);

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(response).toEqual(mockResponse);
  });

  it("patchRequest", async () => {
    const response = await patchRequest("/url", mockPayload);

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
      body: `{"query":"${mockPayload.query}"}`,
    });
    expect(response).toEqual(mockResponse);
  });

  it("patchRequest", async () => {
    const response = await deleteRequest("/url");

    expect(global.fetch).toHaveBeenCalledWith(`/url`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "content-type": "application/json;charset=UTF-8",
      },
    });
    expect(response).toEqual(mockResponse);
  });
});
