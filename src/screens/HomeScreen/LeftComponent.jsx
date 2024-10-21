import React, { useContext } from 'react';
import { Plus } from "lucide-react"
import logo from "../../assests/logo .png"
import { ModalContext } from "../../context/ModalContext"
const LeftComponent = (darkTheme) => {
    const { openModal } = useContext(ModalContext)
    return (
        <div className={`fixed top-0 left-0 h-screen ${darkTheme ? 'bg-[#1e1e1e]' : 'bg-white'} z-50 overflow-y-auto flex items-center justify-center md:relative md:w-full`}>
            <div className="flex flex-col items-center justify-center">
                <div className='flex justify-center'>
                    <img src={logo} alt="" className="w-[165px] mb-4 " />
                </div>
                <h1 className={`text-4xl font-normal ${darkTheme ? 'text-white' : 'text-black'} mb-3`}>
                    <span className="font-bold">Code</span> Sphere
                </h1>
                <div className={`text-2xl ${darkTheme ? 'text-white' : 'text-black'} opacity-70 mb-6`}>
                    Code. Compile. Debug.
                </div>
                <button
                    className={`px-6 ${darkTheme ? 'bg-white text-black' : 'bg-black text-white'} py-1 text-lg border-none rounded-full shadow-[0px_0px_4px_2px_#8b8b8b] flex items-center gap-1 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0px_0px_6px_2px_#8b8b8b]`}
                    onClick={() => openModal({
                        show: true,
                        modalType: 3,
                        identifiers: {
                            folderId: "",
                            cardId: "",
                        }
                    })}
                >
                    <Plus /> Create New File
                </button>
            </div>
        </div>
    );
};

export default LeftComponent;
