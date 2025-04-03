import React, { useEffect, useRef, useCallback } from 'react';

const useClickOutside = (elementRef, handler) => {
    const callback = useCallback(handler, [handler]);

    useEffect(() => {
        const cb = (event) => {
            if (!elementRef.current?.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', cb);
        return () => {
            document.removeEventListener('mousedown', cb);
        };
    }, [elementRef, callback]);
};

const Modal = ({ isOpen, closeModal }) => {
    const modalRef = useRef();

    useClickOutside(modalRef, closeModal);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal-overlay'>
            <div ref={modalRef} className='modal-container'>
                <button className='close-btn' onClick={closeModal}>X</button>
                <h1>MODAL</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem perspiciatis velit porro nemo iure ex omnis quisquam explicabo quas.
                </p>
            </div>
        </div>
    );
};

export default Modal;
