import React, { useState, useContext } from 'react';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { ModalContext } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Pencil, Plus, Trash, FilePlus } from 'lucide-react';
import logo from "../../assests/logo .png"

const SliderSection = ({ isFullScreen }) => {
    const { openModal } = useContext(ModalContext);
    const navigate = useNavigate();
    const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);
    const [openFolders, setOpenFolders] = useState(() => {
        const storedOpenFolders = localStorage.getItem('openFolders');
        return storedOpenFolders ? JSON.parse(storedOpenFolders) : {};
    });

    const handleWrap = (folderId) => {
        setOpenFolders(prevState => {
            const updatedState = {
                ...prevState,
                [folderId]: !prevState[folderId]
            };
            // Save the updated state to local storage
            localStorage.setItem('openFolders', JSON.stringify(updatedState));
            return updatedState;
        });
    };

    if (!isFullScreen) {
        return null;
    }

    return (
        <div className="absolute  right-0 h-full bg-slate-400 md:relative md:w-full border-r-2">
            <div className="flex items-center flex-wrap justify-between p-4 h-15 border-b border-gray-400 bg-gray-500 ">
                <h3 className=" text-xl font-bold  cursor-pointer flex items-center gap-2" onClick={() => { navigate('/') }}>
                    Home
                </h3>
                <div
                    className="text-base rounded-full text-black flex items-center gap-1 cursor-pointer hover:scale-105"
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
            <div className='overflow-y-auto h-[calc(100vh-163px)]'>
                {Object.entries(folders).map(([folderId, folder]) => (
                    <div key={folderId} className="px-2">
                        <div className="flex items-center flex-wrap justify-between pb-3 pt-3 px-2">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {!openFolders[folderId] ? (
                                    <ChevronDown onClick={() => handleWrap(folderId)} color='black' />
                                ) : (
                                    <ChevronUp onClick={() => handleWrap(folderId)} color='black' />
                                )} {folder?.title}
                            </h3>
                            <div className="flex items-center gap-2 cursor-pointer">
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
                                    className="rounded-full text-black text-sm flex items-center gap-1 cursor-pointer hover:scale-105"
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
                                    <FilePlus size={20} />
                                </div>
                            </div>
                        </div>
                        {openFolders[folderId] && (
                            <div className="grid grid-cols-2 gap-1 sm:grid-cols-1 px-2 pb-4">
                                {Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                                    <div
                                        key={playgroundId}
                                        className="px-2 flex items-center flex-wrap justify-between rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                                        onClick={() => {
                                            navigate(`/playground/${folderId}/${playgroundId}`);
                                            window.location.reload();
                                        }}
                                    >
                                        <div className='flex items-center gap-1'>
                                            <img src={logo} className='w-5 h-5' alt="logo" />
                                            <p className=''>{playground?.title}</p>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <Trash size={15} onClick={() => deleteCard(folderId, playgroundId)} />
                                            <Pencil size={15} onClick={() => openModal({
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
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderSection;
