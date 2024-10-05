
import React, { useContext, useState } from 'react'
import { Header, CloseButton, Input } from '../Modals'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { FileOutput } from 'lucide-react'

const EditFolder = () => {
    const { closeModal, isOpenModal } = useContext(ModalContext);
    const { editFolderTitle, folders } = useContext(PlaygroundContext);

    const folderId = isOpenModal.identifiers.folderId;
    const [folderTitle, setFolderTitle] = useState(folders[folderId].title);

    return (
        <>
            <Header>
                <h2>Edit Folder Title</h2>
                <CloseButton onClick={() => closeModal()}>
                    <FileOutput />
                </CloseButton>
            </Header>
            <Input>
                <input type="text" className='flex-grow h-8 border border-gray-300 rounded px-2' onChange={(e) => setFolderTitle(e.target.value)} />
                <button className="bg-gray-800 text-white h-10 px-4 py-1 rounded" onClick={() => {
                    editFolderTitle(folderId, folderTitle)
                    closeModal()
                }} >Update Title</button>
            </Input>
        </>
    )
}

export default EditFolder;
