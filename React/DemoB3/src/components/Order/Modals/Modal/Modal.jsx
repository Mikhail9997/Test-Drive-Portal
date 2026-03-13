import React from "react";
import "./Modal.css";

function Modal({ children, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">{children}</div>
    </>
  );
}

export default Modal;
