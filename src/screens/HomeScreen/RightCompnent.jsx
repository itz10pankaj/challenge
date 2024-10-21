import { FolderOpen, Pencil, Plus, Trash } from 'lucide-react';
import React, { useContext } from 'react';
import logo from "../../assests/logo .png"
import { useNavigate } from 'react-router-dom';
import { PlaygroundContext } from "../../context/PlaygroundContext"
import { ModalContext } from "../../context/ModalContext"
const RightCompnent = ({ darkTheme = false }) => {
    const navigate = useNavigate();
    const { openModal } = useContext(ModalContext)
    const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext)

    return (
        <div className="absolute top-0 right-0 w-3/5 p-8 md:relative md:w-full md:p-4">
            <h1>{darkTheme}</h1>
            <div className="flex items-center flex-wrap justify-between py-3 border-b border-gray-400 mb-4">
                <h3 className="text-2xl font-normal flex items-center gap-2">
                    My <span className="font-bold">Playground</span>
                </h3>
                <div
                    className={`text-base rounded-full text-black flex items-center gap-1 cursor-pointer hover:scale-105 ${darkTheme ? 'text-white' : 'text-black'}`}
                    onClick={() =>
                        openModal({
                            show: true,
                            modalType: 1,
                            identifiers: {
                                folderId: '',
                                cardId: '',
                            },
                        })
                    }
                >
                    <Plus /> New Folder
                </div>
            </div>
            {Object.entries(folders).map(([folderId, folder]) => (
                <div className="mb-4 px-8">
                    <div className="flex items-center flex-wrap justify-between py-3 border-b border-gray-400 mb-4">
                        <h3 className="text-xl font-normal flex items-center gap-2">
                            <FolderOpen color='black' fill='yellow' /> {folder?.title}
                        </h3>
                        <div className={`flex items-center gap-2 cursor-pointer`}>
                            <Trash size={20} onClick={() => deleteFolder(folderId)} />
                            <Pencil size={20}
                                onClick={() =>
                                    openModal({
                                        show: true,
                                        modalType: 4,
                                        identifiers: {
                                            folderId: folderId,
                                            cardId: '',
                                        },
                                    })
                                }
                            />
                            <div
                                className={`text-base rounded-full text-black flex items-center gap-1 cursor-pointer hover:scale-105 ${darkTheme ? 'text-white' : 'text-black'}`}
                                onClick={() =>
                                    openModal({
                                        show: true,
                                        modalType: 2,
                                        identifiers: {
                                            folderId: folderId,
                                            cardId: '',
                                        },
                                    })
                                }
                            >
                                < Plus size={20} /> New File
                            </div>
                        </div>
                    </div>

                    <div className=" grid grid-cols-2 gap-8 sm:grid-cols-1 px-8">
                        {Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                            <div
                                key={playgroundId}
                                className={`p-2 flex w-1/2 items-center justify-between rounded-lg shadow-md shadow-black cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-black ${darkTheme ? 'bg-slate-500' : 'bg-white'}`}
                                onClick={() => {
                                    navigate(`/playground/${folderId}/${playgroundId}`);
                                }}
                            >
                                <div className="flex items-center w-1/2">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="w-16 mr-4 sm:w-12 sm:mr-2"
                                    />
                                    <div className='flex flex-col'>
                                        <p className='font-bold'>{playground?.title}</p>
                                        <p className='font-semibold'>{playground?.language}</p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <Trash onClick={() => deleteCard(folderId, playgroundId)} />
                                    <Pencil onClick={() => openModal({
                                        show: true,
                                        modalType: 5,
                                        identifiers: {
                                            folderId: folderId,
                                            cardId: playgroundId,
                                        }
                                    })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RightCompnent;
