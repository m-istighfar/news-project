import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  background: "#FFFFFF",
  iconColor: "#4C87AB",
  customClass: {
    popup: "!rounded-[20px]",
    closeButton: "!text-line-600",
  },
});

export const showSuccessToast = (message: string) => {
  Toast.fire({
    icon: "success",
    title: message,
    iconColor: "#69D26E",
  });
};

export const showErrorToast = (message: string) => {
  Toast.fire({
    icon: "error",
    title: message,
    iconColor: "#D32F2F",
  });
};

export const showConfirmDialog = async (title: string, text: string, confirmButtonText = "Ya") => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4C87AB",
    cancelButtonColor: "#D32F2F",
    confirmButtonText,
    cancelButtonText: "Batal",
    position: "center",
    background: "#FFFFFF",
    customClass: {
      popup: "!rounded-[20px]",
      confirmButton: "!rounded-[20px]",
      cancelButton: "!rounded-[20px]",
    },
  });

  return result.isConfirmed;
};
