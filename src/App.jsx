import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import "./assets/styles/global.module.css";
import PrivateRoute from "./router/PrivateRouter.jsx";

const AchievementsPage = lazy(() => import("./components/pages/achievements/AchievementsPage.jsx"));
const SchoolPage = lazy(() => import("./components/pages/school/SchoolPage.jsx"));
const AdminPage = lazy(() => import("./components/pages/admin/AdminPage.jsx"));
const Main = lazy(() => import("./components/pages/main/Main.jsx"));
const NotFound = lazy(() => import("./components/pages/not_found/NotFound.jsx"));
const Login = lazy(() => import("./components/pages/login/Login.jsx"));

function App() {

    return (
        <Routes>
            <Route path="/" element={<Suspense><Main/></Suspense>}/>
            <Route path="/login" element={<Suspense><Login/></Suspense>}/>
            <Route path="/*" element={<NotFound/>}/>
            <Route path="/admin" element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
            <Route path="/achievements" element={<Suspense><AchievementsPage/></Suspense>}/>
            <Route path="/school" element={<Suspense><SchoolPage/></Suspense>}/>
        </Routes>
    )
}

export default App
