import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

const AdminPage = lazy(() => import("./components/pages/admin/AdminPage.jsx"));
const Main = lazy(() => import("./components/pages/main/Main.jsx"));
const NotFound = lazy(() => import("./components/pages/not_found/NotFound.jsx"));
const Login = lazy(() => import("./components/pages/login/Login.jsx"));
import "./assets/styles/global.module.css";
import PrivateRoute from "./router/PrivateRouter.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Suspense><Login/></Suspense>}/>
            <Route path="/*" element={<NotFound/>}/>
            <Route path="/admin" element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
        </Routes>
    )
}

export default App
