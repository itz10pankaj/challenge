
import React, { useContext, useState } from 'react'
import { Header, CloseButton, Input } from '../Modals'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { FileOutput } from 'lucide-react'

const EditPlaygroundTitle = () => {
    const { isOpenModal, closeModal } = useContext(ModalContext);
    const { editPlaygroundTitle, folders } = useContext(PlaygroundContext);

    const { folderId, cardId } = isOpenModal.identifiers;
    const [playgroundTitle, setPlaygroundTitle] = useState(folders[folderId].playgrounds[cardId].title);

    return (
        <>
            <Header>
                <h2>Edit File Title</h2>
                <CloseButton onClick={() => closeModal()}>
                    <FileOutput />
                </CloseButton>
            </Header>
            <Input>
                <input type="text" className='flex-grow h-8 border border-gray-300 rounded px-2' onChange={(e) => setPlaygroundTitle(e.target.value)} />
                <button className="bg-gray-800 text-white h-10 px-4 py-1 rounded" onClick={() => {
                    editPlaygroundTitle(folderId, cardId, playgroundTitle)
                    closeModal()
                }}>Update Title</button>
            </Input>
        </>
    )
}

export default EditPlaygroundTitle
