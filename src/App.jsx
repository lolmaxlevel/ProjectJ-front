import {Route, Routes} from "react-router-dom";
import Main from "./components/pages/main/Main.jsx";
import NotFound from "./components/pages/not_found/NotFound.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/admin" element={<div/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
