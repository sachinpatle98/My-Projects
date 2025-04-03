import Swal from "sweetalert2";

/**
 * Show a SweetAlert based on the provided type and message.
 * @param {string} type - success | error | info | warning
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 */
const showAlert = (type, title, message) => {
  Swal.fire({
    icon: type,
    title: title,
    text: message,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};

export default showAlert;
