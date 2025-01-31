import Swal from "sweetalert2";
import theme from "@/theme";
import { showAlert, showLoadingAlertWithPromise } from "./showAlert";
import { get, set } from "js-cookie";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
}));

jest.mock("js-cookie");

(get as jest.Mock).mockReturnValue(null);

describe("Alert Utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("showAlert", () => {
    it('should display an alert with the correct default title for "error"', () => {
      showAlert("error", {
        id: "complete",
        text: "This is an error message.",
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: ["Oh no! Something went wrong"],
        html: "This is an error message.",
        confirmButtonColor: theme.palette.primary.main,
        confirmButtonText: "OK",
        denyButtonColor: theme.palette.default.main,
        denyButtonText: undefined,
        showDenyButton: false,
        allowOutsideClick: false,
        willClose: expect.any(Function),
      });
    });

    it("should override the default title when a custom title is provided", () => {
      showAlert("success", {
        id: "complete",
        text: "Operation completed successfully!",
        title: "Custom Title",
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Custom Title",
        html: "Operation completed successfully!",
        confirmButtonColor: theme.palette.primary.main,
        confirmButtonText: "OK",
        denyButtonColor: theme.palette.default.main,
        denyButtonText: undefined,
        showDenyButton: false,
        allowOutsideClick: false,
        willClose: expect.any(Function),
      });
    });

    it("should display cancel and confirm buttons when cancelButtonText is provided", () => {
      showAlert("question", {
        id: "complete",
        text: "Do you want to proceed?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "question",
        title: ["Are you sure?"],
        html: "Do you want to proceed?",
        confirmButtonColor: theme.palette.primary.main,
        confirmButtonText: "Yes",
        denyButtonColor: theme.palette.default.main,
        denyButtonText: "No",
        showDenyButton: true,
        allowOutsideClick: false,
        willClose: expect.any(Function),
      });
    });
  });

  describe("showLoadingAlertWithPromise", () => {
    it("should display a loading alert and resolve with the promise result", async () => {
      const mockPromise = Promise.resolve("Success");
      const result = await showLoadingAlertWithPromise(mockPromise, {
        loadingMessage: "Loading data...",
        successMessage: "Data loaded successfully!",
        errorMessage: "Failed to load data.",
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Loading data...",
        allowOutsideClick: false,
        didOpen: expect.any(Function),
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Success",
        text: "Data loaded successfully!",
        confirmButtonColor: "#7A89C2",
        willClose: expect.any(Function),
      });

      expect(result).toBe("Success");
    });

    it("should display an error alert when the promise rejects", async () => {
      const mockPromise = Promise.reject();
      const result = await showLoadingAlertWithPromise(mockPromise, {
        loadingMessage: "Processing request...",
        successMessage: "Request completed successfully!",
        errorMessage: "Failed to process request.",
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Processing request...",
        allowOutsideClick: false,
        didOpen: expect.any(Function),
      });

      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Error",
        text: "Failed to process request.",
        confirmButtonColor: "#7A89C2",
        willClose: expect.any(Function),
      });

      expect(result).toBeUndefined();
    });
  });
});
