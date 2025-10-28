import styles from "./modal.module.scss";
interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ isModalOpen, closeModal, children }: ModalProps) {
  if (!isModalOpen) return;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <div className={styles.container} onClick={closeModal}>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
