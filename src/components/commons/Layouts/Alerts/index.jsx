import Swal from 'sweetalert2';

// import 'animate.css';

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timerProgressBar: false,
});

export const SuccessToast = (title, timer) => {
  Toast.fire({
    timer,
    position: 'top',
    icon: 'success',
    title,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
    background: '#ebfaef',
    color: '#37b489',
  });
};

export const ErrorToast = (title, timer) => {
  Toast.fire({
    timer,
    position: 'top',
    icon: 'error',
    title,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
    background: '#fde8e8',
    color: '#e3314c',
  });
};
