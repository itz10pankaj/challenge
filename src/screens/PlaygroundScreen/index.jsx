import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import SliderSection from "./SliderSection";
import EditorContainer from "./EditorContainer";
import Modal from "../../components/Modals";
import { ModalContext } from "../../context/ModalContext";
import { useContext } from "react";
import { languageMap, PlaygroundContext } from "../../context/PlaygroundContext"
import toast, { Toaster } from 'react-hot-toast';

export const PlaygroundScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const { folderId, playgroundId } = useParams()
    const { folders, savePlayground } = useContext(PlaygroundContext)
    const { isOpenModal } = useContext(ModalContext)
    const { title, language, code } = folders[folderId]?.playgrounds[playgroundId]
    const [currentLanguage, setCurrentLanguage] = useState(language)
    const [currentCode, setCurrentCode] = useState(code)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault(); // Prevent the default save dialog
                saveCode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentCode, currentLanguage]);


    const saveCode = () => {
        savePlayground(folderId, playgroundId, currentCode, currentLanguage);
        toast.success('Code saved successfully!');

    }
    const resetCode = () => {
        const defaultCode = languageMap[currentLanguage].defaultCode;
        setCurrentCode(defaultCode);
        savePlayground(folderId, playgroundId, currentCode, currentLanguage);
        toast.success('Code reset to default!');

    }

    const getFile = (e, setState) => {
        const input = e.target;
        if ("files" in input && input.files.length > 0) {
            placeFileContent(input.files[0], setState);
        }
    };

    const placeFileContent = (file, setState) => {
        readFileContent(file)
            .then((content) => {
                setState(content)
            })
            .catch((error) => console.log(error));
    };

    function readFileContent(file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }


    return (
        <div className="flex flex-col h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            {!isFullScreen && <div className="fixed top-0 w-screen h-10">
                <Navbar isFullScreen={isFullScreen} />
            </div>}
            <div className={`w-full h-full flex flex-row ${!isFullScreen ? 'mt-10' : ''} bg-gray-400 overflow-hidden`}>
                {!isFullScreen && <div className="left-0 w-3/12">
                    <SliderSection isFullScreen={!isFullScreen} />
                </div>}
                <div className={`ml-auto ${isFullScreen ? 'w-screen' : 'w-9/12 '}`}>
                    <EditorContainer
                        title={title}
                        currentLanguage={currentLanguage}
                        setCurrentLanguage={setCurrentLanguage}
                        currentCode={currentCode}
                        setCurrentCode={setCurrentCode}
                        folderId={folderId}
                        playgroundId={playgroundId}
                        saveCode={saveCode}
                        resetCode={resetCode}
                        getFile={getFile}
                        isFullScreen={isFullScreen}
                        setIsFullScreen={setIsFullScreen}
                    />
                </div>
            </div>
            {!isFullScreen && <div className="fixed bottom-0 z-10 w-screen h-10 bg-gray-800 text-white flex items-center justify-center mx-auto">
                Made by Pankaj ❤️
            </div>}
            {isOpenModal.show && <Modal />}
        </div>
    )
}