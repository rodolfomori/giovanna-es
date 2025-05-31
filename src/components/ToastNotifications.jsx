import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Componente para configurar o container de notificações toast
 */
const ToastNotifications = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

/**
 * Função para mostrar uma notificação de sucesso
 * @param {string} message - Mensagem a ser exibida
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Função para mostrar uma notificação de erro
 * @param {string} message - Mensagem a ser exibida
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Função para mostrar uma notificação informativa
 * @param {string} message - Mensagem a ser exibida
 */
export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Função para mostrar uma notificação de aviso
 * @param {string} message - Mensagem a ser exibida
 */
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ToastNotifications;