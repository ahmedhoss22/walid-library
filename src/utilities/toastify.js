import toast, { Toaster } from 'react-hot-toast';

export const notifySuccess = (msg) => {
  toast.success(msg, {
    pauseOnHover: true,
    className: 'toast-success',
  });
}
export const notifyInfo = (msg) => {
  toast.info(msg, {
    pauseOnHover: true,
    className: 'toast-info',
  });
};
export const notifyError = (msg) => {
  toast.error(msg, {
    pauseOnHover: true,
    className: 'toast-error',
  });
}
