import LeftComponent from "./LeftComponent";
import RightCompnent from "./RightCompnent";
import Modal from "../../components/Modals";
import { ModalContext } from "../../context/ModalContext";
import { useContext } from "react";
export const HomeScreen = () => {
    const { isOpenModal } = useContext(ModalContext)
    return (
        <div className="w-full min-h-[100vh] flex flex-row">
            <div className="fixed top-0 left-0 w-2/5 h-full">
                <LeftComponent />
            </div>
            <div className="ml-auto w-3/5">
                <RightCompnent />
            </div>
            {isOpenModal.show && <Modal />}
        </div>
    );
}
