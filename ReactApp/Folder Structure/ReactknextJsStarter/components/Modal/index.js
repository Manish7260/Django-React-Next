import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Modals = ({ children, onCloseModal, isOpen = false, onAnimationModal }) => {
    return (
        <Modal open={isOpen} onClose={onCloseModal} onAnimationEnd={onAnimationModal} center focusTrapped={false}>
            {children}
        </Modal>
    );
};
export default Modals;
