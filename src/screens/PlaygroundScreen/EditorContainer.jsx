import React, { useContext, useEffect, useState } from 'react'
import CodeEditor from './CodeEditor'
import { ModalContext } from '../../context/ModalContext'
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext'
import { ArrowRightFromLine, Maximize, Minimize, Pencil } from 'lucide-react';




const EditorContainer = ({
    title,
    currentLanguage,
    setCurrentLanguage,
    currentCode,
    setCurrentCode,
    folderId,
    playgroundId,
    saveCode,
    resetCode,
    getFile,
    isFullScreen,
    setIsFullScreen
}) => {

    const { openModal } = useContext(ModalContext)
    const themeOptions = [
        { value: 'githubDark', label: 'githubDark' },
        { value: 'githubLight', label: 'githubLight' },
        { value: 'bespin', label: 'bespin' },
        { value: 'duotoneDark', label: 'duotoneDark' },
        { value: 'duotoneLight', label: 'duotoneLight' },
        { value: 'dracula', label: 'dracula' },
        { value: 'xcodeDark', label: 'xcodeDark' },
        { value: 'xcodeLight', label: 'xcodeLight' },
        { value: 'vscodeDark', label: 'vscodeDark' },
        { value: 'vscodeLight', label: 'vscodeLight' },
        { value: 'okaidia', label: 'okaidia' },
    ]

    const languageOptions = [
        { value: 'cpp', label: 'cpp' },
        { value: 'javascript', label: 'javascript' },
        { value: 'java', label: 'java' },
        { value: 'python', label: 'python' },
    ]

    const handleThemeChange = (selectedOption) => {
        setCurrentTheme(selectedOption)
    }

    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption)
        setCurrentLanguage(selectedOption.value)
        setCurrentCode(languageMap[selectedOption.value].defaultCode)
    }



    const [currentTheme, setCurrentTheme] = useState({ value: 'githubDark', label: 'githubDark' })
    const [language, setLanguage] = useState(() => {
        for (let i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].value === currentLanguage) {
                return languageOptions[i]
            }
        }
        return languageOptions[0];
    })

    return (
        <div className={`flex flex-col w-full bg-gray-400  ${isFullScreen ? 'h-screen' : ''}`}>
            <div className={` flex justify-between items-center flex-wrap gap-1 p-2  `}>
                <div className="flex justify-between items-center w-full md:w-auto gap-2">
                    <div className="flex items-center gap-4 mr-9 text-lg md:mr-4">
                        <h3 className='font-bold'>{title}</h3>
                        <Pencil onClick={() => openModal({
                            show: true,
                            modalType: 5,
                            identifiers: {
                                folderId: folderId,
                                cardId: playgroundId,
                            }
                        })} />
                    </div>
                    <button className="py-2 px-4 bg-green-500 text-white font-bold rounded-full" onClick={saveCode} >Save code</button>
                    <button className="py-2 px-4 bg-red-400 text-white font-bold rounded-full" onClick={resetCode} >Reset code</button>

                </div>
                <div className="flex items-center  gap-4">
                    <Select
                        options={languageOptions}
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-32"
                    />
                    <Select
                        options={themeOptions}
                        value={currentTheme}
                        onChange={handleThemeChange}
                        className="w-40"
                    />
                </div>
            </div>

            <div className="h-[calc(100%-4rem)]">
                <CodeEditor
                    currentLanguage={currentLanguage}
                    currentTheme={currentTheme.value}
                    currentCode={currentCode}
                    setCurrentCode={setCurrentCode}
                    isFullScreen={isFullScreen}
                />
            </div>

            <div className={`flex  items-center justify-between flex-wrap gap-2 p-2 `}>
                <button className="flex items-center gap-2" onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
                    {!isFullScreen && <div className='flex gap-2 items-center'><Maximize /> Full Screen </div>}
                    {isFullScreen && <div className='flex gap-2 items-center'><Minimize /> Minimize Screen </div>}
                </button>

                <label htmlFor="codefile" className="flex items-center gap-2">
                    <input type="file" accept="." id="codefile" onChange={(e) => getFile(e, setCurrentCode)} className="hidden" /> <ArrowRightFromLine /> Import Code
                </label>

                <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt" className="flex items-center gap-2">
                    <ArrowRightFromLine /> Export Code
                </a>
                {/* <button className="py-2 px-4 bg-[#0097d7] text-white font-bold rounded-full" onClick={runCode}>Run Code</button> */}
            </div>
        </div>
    )
}

export default EditorContainer
