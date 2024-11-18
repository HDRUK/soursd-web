import Swal from "sweetalert2";

export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#d33", // Customize button color (optional)
  });
};
