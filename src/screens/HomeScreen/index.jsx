import LeftComponent from "./LeftComponent";
import RightCompnent from "./RightCompnent";
import Modal from "../../components/Modals";
import { ModalContext } from "../../context/ModalContext";
import { useContext, useState } from "react";
export const HomeScreen = () => {
    // const isOpenModal = ModalCon
    const [darkTheme, setDarkTheme] = useState(false);

    const handleClick = () => {
        setDarkTheme(!darkTheme);
    }

    return (
        <div className={`w-full min-h-[100vh] flex flex-row ${darkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <button onClick={handleClick} className={`z-[100] absolute top-1 left-1 text-white`}>
                Toggle
            </button>
            <div className="fixed top-0 left-0 w-2/5 h-full z-[10]">
                <LeftComponent darkTheme={darkTheme} />
            </div>
            <div className="ml-auto w-3/5 z-[10]">
                <RightCompnent darkTheme={darkTheme} />
            </div>
            {/* {isOpenModal.show && <Modal />} */}
        </div>

    );
}
