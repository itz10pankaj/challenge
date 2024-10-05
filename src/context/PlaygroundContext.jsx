import { useContext, createContext, useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

export const PlaygroundContext = createContext();

export const languageMap = {
    "cpp": {
        id: 54,
        defaultCode:
            "#include <iostream>\n"
            + "using namespace std;\n\n"
            + "int main() {\n"
            + '\tcout << "Hello World!";\n'
            + "\treturn 0;\n"
            + "}",
    },
    "java": {
        id: 62,
        defaultCode:
            "public class Main {\n" +
            "    public static void main(String[] args) {\n" +
            "        System.out.println(\"Hello World!\");\n" +
            "    }\n" +
            "}",
    },
    "python": {
        id: 71,
        defaultCode: "print(\"Hello World!\")",
    },
    "javascript": {
        id: 63,
        defaultCode: "console.log(\"Hello World!\");",
    }
}

export const PlaygroundProvider = ({ children }) => {
    const initialItems = {
        [uuid()]: {
            title: "DSA",
            playgrounds: {
                [uuid()]: {
                    title: "Stack_Implementation",
                    language: "cpp",
                    code: languageMap["cpp"].defaultCode,
                },
                [uuid()]: {
                    title: "Array",
                    language: "javascript",
                    code: languageMap["javascript"].defaultCode,
                },
                [uuid()]: {
                    title: "PANKAJ",
                    language: "javascript",
                    code: languageMap["javascript"].defaultCode,
                },
            }
        },
        [uuid()]: {
            title: "DSA",
            playgrounds: {
                [uuid()]: {
                    title: "Stack_Implementation",
                    language: "cpp",
                    code: languageMap["cpp"].defaultCode,
                },
                [uuid()]: {
                    title: "Array",
                    language: "javascript",
                    code: languageMap["javascript"].defaultCode,
                },
                [uuid()]: {
                    title: "PANKAJ",
                    language: "javascript",
                    code: languageMap["javascript"].defaultCode,
                },
            }
        },
    }

    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('playgrounds-data');
        return localData ? JSON.parse(localData) : initialItems;
    });

    useEffect(() => {
        localStorage.setItem('playgrounds-data', JSON.stringify(folders));
    }, [folders]);

    const deleteCard = (folderId, cardId) => {
        setFolders((oldState) => {
            const newState = { ...oldState };
            if (newState[folderId] && newState[folderId].playgrounds[cardId]) {
                delete newState[folderId].playgrounds[cardId];
            }
            return newState;
        });
    }

    const deleteFolder = (folderId) => {
        setFolders((oldState) => {
            const newState = { ...oldState };
            if (newState[folderId]) {
                delete newState[folderId];
            }
            return newState;
        });
    }

    const addFolder = (folderName) => {
        setFolders((oldState) => {
            const newState = { ...oldState };
            newState[uuid()] = {
                title: folderName,
                playgrounds: {}
            }
            return newState;
        });
    }

    const addPlayground = (folderId, playgroundName, language) => {
        setFolders((oldState) => {
            const newState = { ...oldState };
            if (newState[folderId]) {
                newState[folderId].playgrounds[uuid()] = {
                    title: playgroundName,
                    language: language,
                    code: languageMap[language].defaultCode,
                }
            }
            return newState;
        });
    }

    const addPlaygroundAndFolder = (folderName, playgroundName, cardLanguage) => {
        setFolders((oldState) => {
            const newState = { ...oldState }
            newState[uuid()] = {
                title: folderName,
                playgrounds: {
                    [uuid()]: {
                        title: playgroundName,
                        language: cardLanguage,
                        code: languageMap[cardLanguage].defaultCode,
                    }
                }
            }
            return newState;
        });
    }

    const editFolderTitle = (folderId, folderName) => {
        setFolders((oldState) => {
            const newState = { ...oldState }
            if (newState[folderId]) {
                newState[folderId].title = folderName;
            }
            return newState;
        });
    }

    const editPlaygroundTitle = (folderId, playgroundId, PlaygroundTitle) => {
        setFolders((oldState) => {
            const newState = { ...oldState }
            if (newState[folderId] && newState[folderId].playgrounds[playgroundId]) {
                newState[folderId].playgrounds[playgroundId].title = PlaygroundTitle;
            }
            return newState;
        });
    }

    const savePlayground = (folderId, playgroundId, newCode, newLanguage) => {
        setFolders((oldState) => {
            const newState = { ...oldState };
            if (newState[folderId] && newState[folderId].playgrounds[playgroundId]) {
                newState[folderId].playgrounds[playgroundId].code = newCode;
                newState[folderId].playgrounds[playgroundId].language = newLanguage;
            }
            return newState;
        });
    }

    const PlayGroundFeatures = {
        folders,
        deleteCard,
        deleteFolder,
        addFolder,
        addPlayground,
        addPlaygroundAndFolder,
        editFolderTitle,
        editPlaygroundTitle,
        savePlayground,
    }

    return (
        <PlaygroundContext.Provider value={PlayGroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
    )
}
