import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { PlaygroundScreen } from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./context/PlaygroundContext";
import ModalProvider from "./context/ModalContext";


function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/playground/:folderId/:playgroundId" element={<PlaygroundScreen />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
