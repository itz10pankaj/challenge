import React, { useContext, useState } from 'react';
import { Header, CloseButton } from '../Modals';
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import Select from 'react-select';
import { FileOutput } from 'lucide-react';

const NewPlayground = () => {
    const { isOpenModal, closeModal } = useContext(ModalContext);
    const { addPlayground } = useContext(PlaygroundContext);

    const languageOptions = [
        { value: "cpp", label: "cpp" },
        { value: "java", label: "java" },
        { value: "javascript", label: "javascript" },
        { value: "python", label: "python" },
    ];

    const { folderId } = isOpenModal.identifiers;
    const [cardTitle, setCardTitle] = useState("");
    const [language, setLanguage] = useState(languageOptions[0]);

    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption);
    };

    return (
        <>
            <Header>
                <h2>Create New File</h2>
                <CloseButton onClick={() => closeModal()}>
                    <FileOutput />
                </CloseButton>
            </Header>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4 mt-5 items-center">
                <input
                    type='text'
                    className="flex-grow h-8 border border-gray-300 rounded px-2"
                    onChange={(e) => setCardTitle(e.target.value)}
                />
                <Select
                    options={languageOptions}
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-32"
                />
                <button
                    className="bg-gray-800 text-white h-10 px-8 py-1 rounded"
                    onClick={() => {
                        addPlayground(folderId, cardTitle, language.label);
                        closeModal();
                    }}
                >
                    Create File
                </button>
            </div>
        </>
    );
}

export default NewPlayground;
