
import React, { useContext, useState } from 'react'
import { Header, CloseButton, Input } from '../Modals'

import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { FileOutput } from 'lucide-react'
const NewFolder = () => {
    const { closeModal } = useContext(ModalContext);
    const { addFolder } = useContext(PlaygroundContext)
    const [folderTitle, setFolderTitle] = useState("");

    return (
        <>
            <Header>
                <h2>Create New Folder</h2>
                <CloseButton onClick={() => closeModal()}>
                    <FileOutput />
                </CloseButton>
            </Header>
            <Input>
                <input type="text" className='flex-grow h-8 border border-gray-300 rounded px-2' onChange={(e) => setFolderTitle(e.target.value)} />
                <button onClick={() => {
                    addFolder(folderTitle)
                    closeModal()
                }}
                    className="bg-gray-800 text-white h-10 px-4 py-1 rounded">Create Folder</button>
            </Input>
        </>
    )
}

export default NewFolder
