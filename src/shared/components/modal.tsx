
// custom modal components tack the header and the body 

import React from 'react';


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    header: React.ReactNode;
    body: React.ReactNode;
    className?: string;
    children?: React.ReactNode; // Add this line

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, body, className ,children }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className={`modal ${className}`}>
                <div className="modal-header">
                    {header}
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        {body}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal
