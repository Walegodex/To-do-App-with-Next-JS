import React from "react";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open : boolean) => boolean | void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div>
      {modalOpen ? (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            {children}
            <div className="modal-backdrop"></div>
            </div>
          </div>
           ) : null}
    </div>
  );
};

export default Modal;
