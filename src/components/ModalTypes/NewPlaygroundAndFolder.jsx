import React, { useContext, useState } from 'react'
import { Header, CloseButton } from '../Modals'
// import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'

import Select from 'react-select';
import { FileOutput } from 'lucide-react';

const NewPlaygroundAndFolder = () => {
    const { closeModal } = useContext(ModalContext);
    const { addPlaygroundAndFolder } = useContext(PlaygroundContext);

    const languageOptions = [
        { value: "cpp", label: "cpp" },
        { value: "java", label: "java" },
        { value: "javascript", label: "javascript" },
        { value: "python", label: "python" },
    ];

    const [playgroundName, setPlaygroundName] = useState("")
    const [folderName, setFolderName] = useState("")
    const [language, setLanguage] = useState(languageOptions[0]);

    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption);
    };

    return (
        <>
            <Header>
                <h2>Create New File & Create New Folder</h2>
                <CloseButton onClick={() => closeModal()}>
                    {/* <IoCloseSharp /> */}
                    <FileOutput />
                </CloseButton>
            </Header>
            <div className="grid grid-cols-2 gap-4 mt-5 items-center md:grid-cols-1">
                <label>Enter Folder Name</label>
                <input
                    type='text'
                    onChange={(e) => setFolderName(e.target.value)}
                    className="flex-grow h-8 border border-gray-300 rounded px-2"
                />

                <label>Enter File Name</label>
                <input
                    type='text'
                    onChange={(e) => setPlaygroundName(e.target.value)}
                    className="flex-grow h-8 border border-gray-300 rounded px-2"
                />

                <Select
                    options={languageOptions}
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-32"
                />

                <button
                    onClick={() => {
                        addPlaygroundAndFolder(folderName, playgroundName, language.label)
                        closeModal();
                    }}
                    className="bg-gray-800 text-white h-10 px-4 py-1 rounded"
                >
                    Create Playground
                </button>
            </div>
        </>
    )
}

export default NewPlaygroundAndFolder
