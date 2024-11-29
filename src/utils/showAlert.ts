import Swal, { SweetAlertIcon } from "sweetalert2";

const notificationValues = [
  { type: "error", title: "Oh no! Something went wrong" },
  { type: "success", title: "Success!" },
  { type: "warning", title: "Just to warn you..." },
  { type: "info", title: "Something to note" },
  { type: "question", title: "Are you sure?" },
];

/**
 * Type must be one of the following: 'success' | 'error' | 'warning' | 'info' | 'question'
 * Show an alert
 * @param message The message to display
 */
export const showAlert = (
  type: SweetAlertIcon,
  message: string,
  titleOverride?: string | undefined
) => {
  Swal.fire({
    icon: type,
    title:
      titleOverride ??
      notificationValues
        .filter(item => item.type === type)
        .map(item => item.title),
    text: message,
    confirmButtonColor: "#7A89C2",
  });
};

/**
 * Show a loading spinner and handle promise updates
 * @param promise A promise that resolves or rejects
 * @param loadingMessage The message to display while loading
 * @param successMessage The message to display upon success
 * @param errorMessage The message to display upon error
 */
export const showLoadingAlertWithPromise = async <T>(
  promise: Promise<T>,
  loadingMessage: string = "Loading...",
  successMessage: string = "Operation completed successfully!",
  errorMessage: string = "Something went wrong. Please try again."
): Promise<T | void> => {
  // Show loading spinner
  Swal.fire({
    title: loadingMessage,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Wait for the promise to resolve
    const result = await promise;

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Success",
      text: successMessage,
      confirmButtonColor: "#7A89C2",
    });

    return result;
  } catch (_) {
    // Show error message
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
      confirmButtonColor: "#7A89C2", // Customize button color (optional)
    });
    return undefined;
  }
};
