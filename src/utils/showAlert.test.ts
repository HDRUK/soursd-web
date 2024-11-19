import Swal from "sweetalert2";
import { showAlert, showLoadingAlertWithPromise } from "./showAlert";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
}));

describe("showAlert", () => {
  it("should call Swal.fire with correct parameters for a success alert", () => {
    const message = "Operation was successful!";
    showAlert("success", message);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: ["Success!"],
      text: message,
      confirmButtonColor: "#7A89C2",
    });
  });

  it("should call Swal.fire with overridden title if provided", () => {
    const message = "Custom success message.";
    const titleOverride = "Custom Title";
    showAlert("success", message, titleOverride);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: titleOverride,
      text: message,
      confirmButtonColor: "#7A89C2",
    });
  });

  it("should call Swal.fire with correct title based on type", () => {
    const message = "Something went wrong.";
    showAlert("error", message);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: ["Oh no! Something went wrong"],
      text: message,
      confirmButtonColor: "#7A89C2",
    });
  });
});

describe("showLoadingAlertWithPromise", () => {
  it("should show a loading alert initially", async () => {
    const promise = new Promise<void>(resolve => {
      setTimeout(() => resolve(), 100);
    });
    showLoadingAlertWithPromise(promise);

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: expect.any(Function),
    });
  });

  it("should show a success alert if the promise resolves", async () => {
    const promise = Promise.resolve("Success result");
    await showLoadingAlertWithPromise(promise);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "Success",
      text: "Operation completed successfully!",
      confirmButtonColor: "#7A89C2",
    });
  });

  it("should show an error alert if the promise rejects", async () => {
    const promise = Promise.reject(new Error("Some error"));
    await showLoadingAlertWithPromise(promise);

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Error",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#7A89C2",
    });
  });

  it("should use custom messages for loading, success, and error", async () => {
    const promise = Promise.resolve("Custom result");
    const loadingMessage = "Custom Loading...";
    const successMessage = "Custom Success!";
    const errorMessage = "Custom Error!";

    await showLoadingAlertWithPromise(
      promise,
      loadingMessage,
      successMessage,
      errorMessage
    );

    expect(Swal.fire).toHaveBeenCalledWith({
      title: loadingMessage,
      allowOutsideClick: false,
      didOpen: expect.any(Function),
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "Success",
      text: successMessage,
      confirmButtonColor: "#7A89C2",
    });
  });
});
