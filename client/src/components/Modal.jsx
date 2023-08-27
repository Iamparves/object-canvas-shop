import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ children }) => {
  const navigate = useNavigate();

  const closeModal = (e) => {
    if (e.target.closest(".modalCard")) return;
    navigate("..", { state: { reload: false } });
  };

  return (
    <div
      className="fixed left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-dark-900/30 px-3 py-10 backdrop-blur-[2px]"
      onClick={closeModal}
    >
      <div className="modalCard max-h-full w-full max-w-lg overflow-y-auto rounded-md bg-white p-5">
        {children}
      </div>
    </div>
  );
};

export default Modal;
