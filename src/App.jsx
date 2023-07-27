import {lazy} from "react";
import {Route, Routes} from "react-router-dom";
const Admin = lazy(() => import("./components/pages/admin/AdminPage.jsx"));
const Main = lazy(() => import("./components/pages/main/Main.jsx"));
const NotFound = lazy(() => import("./components/pages/not_found/NotFound.jsx"));

function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
