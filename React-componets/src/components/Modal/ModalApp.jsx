import React, { useState } from 'react'
import Modal from './Modal';
import './Modal.css';


const ModalApp = () => {
    const [showModal, setShowModal] = useState();

    return (
        <div className='App'>
            <button className='modal-button' onClick={() => setShowModal(true)}>Show Modal</button>
            <Modal isOpen={showModal} closeModal={() => setShowModal(false)} />
        </div>
    )
}

export default ModalApp;
