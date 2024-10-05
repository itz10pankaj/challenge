import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import NewPlaygroundAndFolder from "./ModalTypes/NewPlaygroundAndFolder"
import EditFolder from "./ModalTypes/EditFolder"
import EditPlaygroundTitle from "./ModalTypes/EditPlaygroundTitle"
import NewFolder from "./ModalTypes/NewFolder"
import NewPlayground from "./ModalTypes/NewPlayground"
import Loading from "./ModalTypes/Loading"
const Modal = () => {
    const { isOpenModal } = useContext(ModalContext);
    const { modalType } = isOpenModal;

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-20 flex justify-center items-center">
            <div className="bg-white p-6 w-1/3 min-w-[300px] rounded-lg">
                {modalType === 1 && <NewFolder />}
                {modalType === 2 && <NewPlayground />}
                {modalType === 3 && <NewPlaygroundAndFolder />}
                {modalType === 4 && <EditFolder />}
                {modalType === 5 && <EditPlaygroundTitle />}
                {modalType === 6 && <Loading />}
            </div>
        </div>
    );
};

export const Header = ({ children }) => (
    <div className="flex items-center justify-between">
        {children}
    </div>
);

export const CloseButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="bg-transparent outline-none border-none text-2xl cursor-pointer"
    >
        &times;
    </button>
);

export const Input = ({ children }) => (
    <div className="flex items-center justify-between flex-wrap py-6 gap-8 pb-0">
        {children}
    </div>
);

export default Modal;
